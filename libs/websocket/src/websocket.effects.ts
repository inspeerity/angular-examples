import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  catchError,
  filter,
  map,
  mergeMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromActions from './websocket.actions';
import { WebSocketService } from './websocket.service';

@Injectable()
export class WebSocketEffects {

  /**
   * WebSocket connection initialization
   * The payload of this action is token
   * example:
   *     this.store.dispatch(new InitializeConnection('080ece86-d207-4e82-b971-89aa631bb578'))
   */
  @Effect({ dispatch: false })
  initializeConnection$ = this.actions$.ofType(fromActions.INITIALIZE_CONNECTION)
    .pipe(
      tap((action: fromActions.InitializeConnection) => this.service.connect(action.payload))
    );

  /**
   * Create an observable that will receive data from our WebSocket on provided path
   * The payload of this action is WebSocket path
   * example:
   *     this.store.dispatch(new StartNotifications('/websocket/datasets/1/statistics')
   */
  @Effect()
  startNotifications$ = this.actions$.ofType(fromActions.START_NOTIFICATIONS)
    .pipe(
      mergeMap((action: fromActions.StartNotifications) =>
        this.service.notifications(action.payload)
          .pipe(takeUntil(this.stopNotification(action))) // unsubscribe when STOP_NOTIFICATIONS action is emitted
      ),
      catchError(error => of(false)),
      filter(response => !!response)
    )
    .pipe(
      map(message => ({
        type: fromActions.NEW_NOTIFICATION,
        payload: message
      }))
    );

  @Effect({ dispatch: false })
  sentNotifications$ = this.actions$.ofType(fromActions.SENT_NOTIFICATION)
    .pipe(
      tap((action: fromActions.SentNotification) => this.service.sendMessage(action.payload))
    );

  constructor(
    private actions$: Actions,
    private service: WebSocketService,
  ) {
  }

  /**
   * Helper function that indicates that the observable is completed
   * example:
   *     this.store.dispatch(new StopNotifications('/websocket/datasets/1/statistics'))
   */
  private stopNotification = (action: fromActions.StartNotifications) =>
    this.actions$.ofType(fromActions.STOP_NOTIFICATIONS)
      .pipe(
        filter((stopAction: fromActions.StopNotifications) => stopAction.payload === action.payload)
      )
}
