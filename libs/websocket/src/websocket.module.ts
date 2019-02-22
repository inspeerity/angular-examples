import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { WebSocketEffects } from './websocket.effects';
import { WebSocketProvider } from './websocket.provider';
import { WebSocketService } from './websocket.service';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ WebSocketEffects ])
  ],
  providers: [
    WebSocketProvider,
    WebSocketService,
  ],
})
export class WebSocketModule {
}
