import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BaseUrlInterceptor } from './base-url.interceptor';
import { HeaderInterceptor } from './header.interceptor';
import { HttpListenerInterceptor } from './http-listener.interceptor';

export const BASE_API_URL = 'BASE_API_URL';

export { BaseUrlInterceptor, HeaderInterceptor };

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpListenerInterceptor, multi: true }
];
