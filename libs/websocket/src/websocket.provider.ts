import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketProvider {
    provide(url: string) {
        return new WebSocket(url);
    }
}
