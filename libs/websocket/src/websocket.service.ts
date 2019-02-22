import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { filter, map, share, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

import * as fromActions from './websocket.actions';
import { WebSocketProvider } from './websocket.provider';
import { WebSocketMessage } from './websocket.model';

const KEEP_ALIVE = 5000;


@Injectable()
export class WebSocketService {
    private subject: Subject<MessageEvent>;
    private messages: Subject<WebSocketMessage>;
    private interval: Observable<number>;
    private active: boolean;
    private intervalSubscription;

    constructor(
        private store: Store<any>,
        private webSocketProvider: WebSocketProvider
    ) {
        this.active = true;
        this.interval = interval(KEEP_ALIVE);
    }

    /**
     * Create an Observable that emit messages from specific path
     * @param path communication path between a client and a server
     */
    notifications<T extends WebSocketMessage>(path: string): Observable<WebSocketMessage> {
        return this.messages
            .pipe(filter((message: WebSocketMessage) => message._path === path));
    }

    /**
     * Send a message to the WebSocket server
     * @param path communication path between a client and a server
     * @param message a message that will be sent to the server
     */
    sendMessage(payload: WebSocketMessage) {
        const jsonMessage = Object.assign(
            {},
            payload.message,
            {
                _path: payload._path
            }
        );
        this.messages.next(jsonMessage);
    }

    /**
     * Initialize client-side WebSocket connection
     * @param accessToken authorization token
     * @return Subject<MessageEvent>
     */
    connect(accessToken: string) {
        if (!this.subject) {
            this.subject = this.create(this.getUrl(accessToken));
            this.messages = <Subject<WebSocketMessage>>this.subject.pipe(
                map((response: any): WebSocketMessage => JSON.parse(response.data)),
                share()
            );
        }
        return this.messages;
    }

    private create(url: string): Subject<MessageEvent> {
        let ws;
        const observable = Observable.create(
            (obs: Observer<any>) => {
                ws = this.webSocketProvider.provide(url);
                ws.onmessage = obs.next.bind(obs);
                ws.onerror   = obs.error.bind(obs);
                ws.onclose   = obs.complete.bind(obs);

                ws.onopen = () => {
                    this.store.dispatch(new fromActions.InitializeConnectionSuccess());
                    this.intervalSubscription = this.interval
                        .pipe(
                            takeWhile(() => this.active)
                        )
                        .subscribe(_ =>  ws.send(''));
                };

                const close = () => {
                    this.intervalSubscription.unsubscribe();
                    ws.close();
                };

                return close;
            });

        const observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            },
            error: (err) => {
                this.active = false;
            },
            complete:  () => {
                this.active = false;
            }
        };

        return Subject.create(observer, observable);
    }

    private getUrl(accessToken: string): string {
        const protocol = (window.location.protocol === 'http:') ? 'ws:' : 'wss:';
        const hostname = window.location.hostname;
        const token = accessToken ? `?access_token=${accessToken}` : '';
        return `${protocol}//${hostname}/websocket${token}`;
    }
}
