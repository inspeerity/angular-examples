import { Action } from '@ngrx/store';

import { WebSocketMessage } from './websocket.model';

export const INITIALIZE_CONNECTION = '[WebSocket] Initialize connection';
export const INITIALIZE_CONNECTION_SUCCESS = '[WebSocket] Initialize connection Success';
export const START_NOTIFICATIONS = '[WebSocket] Start Notifications';
export const STOP_NOTIFICATIONS = '[WebSocket] Stop Notifications';
export const NEW_NOTIFICATION = '[WebSocket] New Notification';
export const SENT_NOTIFICATION = '[WebSocket] Sent Notification';

export class InitializeConnection implements Action {
    readonly type = INITIALIZE_CONNECTION;
    constructor(public payload: string) {}
}

export class InitializeConnectionSuccess implements Action {
    readonly type = INITIALIZE_CONNECTION_SUCCESS;
}

export class StartNotifications implements Action {
    readonly type = START_NOTIFICATIONS;
    constructor(public payload: string) {}
}

export class StopNotifications implements Action {
    readonly type = STOP_NOTIFICATIONS;
    constructor(public payload: string) {}
}

export class NewNotification implements Action {
    readonly type = NEW_NOTIFICATION;
    constructor(public payload: WebSocketMessage) {}
}

export class SentNotification implements Action {
    readonly type = SENT_NOTIFICATION;
    constructor(public payload: WebSocketMessage) {}
}


export type Actions =
    | InitializeConnection
    | StartNotifications
    | StopNotifications
    | NewNotification;
