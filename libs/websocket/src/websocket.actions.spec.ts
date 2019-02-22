import * as fromActions from './websocket.actions';
import { WebSocketMessage } from './websocket.model';

describe('WebSocket Actions', () => {

  describe('InitializeConnection', () => {
    it('should create an action', () => {
      const payload = 'token';
      const action = new fromActions.InitializeConnection(payload);

      expect({ ...action }).toEqual({
        type: fromActions.INITIALIZE_CONNECTION,
        payload
      });
    });
  });

  describe('StartNotifications', () => {
    it('should create an action', () => {
      const payload = 'special-path';
      const action = new fromActions.StartNotifications(payload);

      expect({ ...action }).toEqual({
        type: fromActions.START_NOTIFICATIONS,
        payload
      });
    });
  });

  describe('StopNotifications', () => {
    it('should create an action', () => {
      const payload = 'special-path';
      const action = new fromActions.StopNotifications(payload);

      expect({ ...action }).toEqual({
        type: fromActions.STOP_NOTIFICATIONS,
        payload
      });
    });
  });

  describe('NewNotification', () => {
    it('should create an action', () => {
      const payload: WebSocketMessage = {
        _path: 'special-path',
        message: 'message'
      };
      const action = new fromActions.NewNotification(payload);

      expect({ ...action }).toEqual({
        type: fromActions.NEW_NOTIFICATION,
        payload
      });
    });
  });

  describe('SentNotification', () => {
    it('should create an action', () => {
      const payload: WebSocketMessage = {
        _path: 'special-path',
        message: 'message'
      };
      const action = new fromActions.SentNotification(payload);

      expect({ ...action }).toEqual({
        type: fromActions.SENT_NOTIFICATION,
        payload
      });
    });
  });

});
