import { Observable } from 'rxjs/Observable';

export class MockNotificationService {
    error = jest.fn(() => new Promise<boolean>((resolve, reject) => resolve(true)));
    info = jest.fn(() => new Promise<boolean>((resolve, reject) => resolve(true)));
    success = jest.fn(() => new Promise<boolean>((resolve, reject) => resolve(true)));
    dismissToast = jest.fn(() => new Promise<boolean>((resolve, reject) => resolve(true)));
  }
