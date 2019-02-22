import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { readAll } from '@nrwl/nx/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import * as fromActions from './websocket.actions';
import { WebSocketEffects } from './websocket.effects';
import { WebSocketMessage } from './websocket.model';
import { WebSocketService } from './websocket.service';
import { WebSocketServiceMock } from './websocket.service.mock';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }
  set stream(source: Observable < any > ) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('WebSocketEffects', () => {

  let actions$;
  let service: WebSocketService;
  let effects: WebSocketEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
          provide: WebSocketService,
          useClass: WebSocketServiceMock
        },
        WebSocketEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });
    actions$ = TestBed.get(Actions);
    service = TestBed.get(WebSocketService);
    effects = TestBed.get(WebSocketEffects);
  });

  describe('initializeConnection', () => {

    it(`should initialize WebSocket connection`, async() => {
      const token = 'token';
      const action = new fromActions.InitializeConnection(token);
      actions$.stream = hot('--a-', { a: action });

      effects.initializeConnection$.subscribe(a => {
        expect(service.connect).toHaveBeenCalledWith(token);
      });
    });

  });

  describe('sentNotifications', () => {

    it(`should call sendMessage on WebSocket service`, async() => {
      const payload: WebSocketMessage = {
        _path: 'sepcial-path',
        message: 'message'
      };
      const action = new fromActions.SentNotification(payload);
      actions$.stream = hot('--a-', { a: action });

      effects.sentNotifications$.subscribe(a => {
        expect(service.sendMessage).toHaveBeenCalledWith(payload);
      });
    });

  });

  describe('startNotifications', () => {

    it(`should return a message from NewNotification`, async() => {
      const payload: WebSocketMessage = {
        _path: 'sepcial-path',
        message: 'message'
      };
      jest.spyOn(service, 'notifications').mockImplementation(() => of (payload));
      const path = 'special-path';
      const action = new fromActions.StartNotifications(path);
      const completion = new fromActions.NewNotification(payload);

      actions$.stream = hot('--a-', { a: action });

      effects.startNotifications$.subscribe(a => {
        expect(a).toEqual(completion);
      });
    });

  });

});
