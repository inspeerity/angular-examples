import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";

import { HttpStatusService } from "@inspeerity/shared-services";
import { provideMagicalMock } from "@inspeerity/tools/testing";

import { HttpListenerInterceptor } from "./http-listener.interceptor";

describe(`HttpListenerInterceptor`, () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let httpStatusService: HttpStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMagicalMock(HttpStatusService),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpListenerInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    httpStatusService = TestBed.get(HttpStatusService);
  });

  it("should set loading flag to true", () => {
    const URL = "/api/test";
    http.post(URL, {}).subscribe();
    const httpRequest = httpMock
      .expectOne({
        method: "POST",
        url: URL
      })
      .flush({});

    expect(httpStatusService.setLoadingState).toHaveBeenCalledTimes(3);
  });

  it("should handle error events", () => {
    const URL = "/api/test";
    let response, errResponse;
    http
      .post(URL, {})
      .subscribe(res => (response = res), error => (errResponse = error));

    const httpRequest = httpMock
      .expectOne({
        method: "POST",
        url: URL
      })
      .error(new ErrorEvent("Unknown Error"));

    expect(httpStatusService.setLoadingState).toHaveBeenCalledTimes(2);
  });
});
