import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let finalRequest = request;
    if (request.url.startsWith('/api')) {
      finalRequest = request.clone({
        setHeaders: {
          'Content-Type':
            request.headers.get('Content-Type') ||
            'application/json;charset=UTF-8',
          'X-API-VERSION': '1'
        }
      });
    }
    return next.handle(finalRequest);
  }
}
