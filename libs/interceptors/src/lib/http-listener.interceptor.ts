import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";

import { HttpStatusService } from "@inspeerity/shared-services";

@Injectable()
export class HttpListenerInterceptor implements HttpInterceptor {
  constructor(private httpStatusService: HttpStatusService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(() => {
        this.httpStatusService.setLoadingState(true);
      }),
      catchError(error => {
        return throwError(error);
      }),
      finalize(() => {
        this.httpStatusService.setLoadingState(false);
      })
    );
  }
}
