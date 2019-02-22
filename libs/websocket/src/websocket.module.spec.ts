import { WebSocketModule } from './websocket.module';

describe('Websocket', () => {
  it('should work', () => {
    expect(new WebSocketModule()).toBeDefined();
  });
});
