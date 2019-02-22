import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Server, WebSocket } from 'mock-socket';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { filter, map, share, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

import { MockStore } from './../../../apps/c2-front/src/testing';
import { WebSocketMessage } from './websocket.model';
import { WebSocketProvider } from './websocket.provider';
import { WebSocketService } from './websocket.service';

jest.useFakeTimers();

describe('WebSocketService', () => {

    let webSocketService: WebSocketService;
    let mockSocket, server;
    const token = 'abcd1234';
    const callback = () => jest.fn();

    beforeEach(() => {
        server = new Server('ws://localhost:8080');
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: WebSocketProvider,
                    useValue: {
                        provide: (params) => {
                            mockSocket = new WebSocket('ws://localhost:8080');
                            return mockSocket;
                        }
                    }
                },
                {
                    provide: Store,
                    useClass: MockStore
                },
                WebSocketService,
            ]
        });
        webSocketService = TestBed.get(WebSocketService);
    });

    afterEach(() => {
        server.close();
    });

    describe('connect()', () => {

        it('should return Subject<MessageEvent> ', fakeAsync((t) => {
            expect(webSocketService.connect(token)).toEqual(expect.any(Subject));
        }));

        it('should keep connection alive', () => {
            server.on('connection', mockServer => {
                mockServer.on('message', data => {
                    expect(data).toEqual('');
                    mockServer.close();
                });
            });
            webSocketService.connect(token).subscribe(_ => _);
            jest.runAllTimers();
        });

        it('should return Subscription', () => {
            const subscription = webSocketService.connect(token).subscribe(_ => _);
            jest.runOnlyPendingTimers();
            expect(subscription).toEqual(expect.any(Subscription));
        });

        it('should close websocket connection on unsubscribe', () => {
            const mock = jest.fn();
            server.on('close', mock);
            const subscription = webSocketService.connect(token).subscribe();
            jest.runOnlyPendingTimers();
            subscription.unsubscribe();
            expect(mock).toHaveBeenCalled();
        });

    });

    describe('notifications()', () => {

        it('should emit a message when server send a value on subscribed path', () => {
            const jsonMessage: WebSocketMessage = Object.assign(
                {},
                { message: 'error' },
                {
                    _path: 'path'
                }
            );
            server.on('connection', s => s.send(JSON.stringify(jsonMessage)));
            webSocketService.connect(token).subscribe(_ => _);
            webSocketService.notifications('path')
                .subscribe(message => expect(message).toBeDefined());
            jest.runOnlyPendingTimers();
        });

        it('should NOT a message  when server send a value on unsubscribed path', () => {
            let response;
            const jsonMessage: WebSocketMessage = Object.assign(
                {},
                { message: 'error' },
                {
                    _path: 'other-path'
                }
            );
            server.on('connection', s => s.send(JSON.stringify(jsonMessage)));
            webSocketService.connect(token).subscribe(_ => _);
            webSocketService.notifications('path')
            .subscribe(message => response = message);
            jest.runOnlyPendingTimers();
            expect(response).toBeUndefined();
        });

    });

    describe('sendMessage()', () => {

        const mock = jest.fn();

        it('should send a new message on websocket', () => {
            server.on('connection', s => s.on('message', mock));
            webSocketService.connect(token).subscribe(_ => _);
            jest.runOnlyPendingTimers();
            webSocketService.sendMessage({ _path: 'path', message: 'message'});
            jest.runOnlyPendingTimers();
            expect(mock).toHaveBeenCalled();
        });

    });

});
