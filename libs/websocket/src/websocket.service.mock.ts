import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketServiceMock {
    connect = jest.fn();
    notifications = jest.fn();
    sendMessage = jest.fn();
}
