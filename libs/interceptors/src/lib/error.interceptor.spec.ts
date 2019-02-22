import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";

import { AuthenticationService } from "@inspeerity/pact-services";
import { provideMagicalMock } from "@inspeerity/tools/testing";

import { ErrorInterceptor } from "./error.interceptor";

describe(`ErrorInterceptor`, () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMagicalMock(AuthenticationService),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
    authenticationService = TestBed.get(AuthenticationService);
  });

  it("should reaload a page and remove token from the local storage on 401", () => {
    const URL = "/api/test";
    const mockErrorResponse = {
      status: 401,
      statusText: "Unautorize"
    };
    const data = "Unautorize";
    http.post(URL, {}).subscribe();

    window.location.reload = jest.fn();
    const httpRequest = httpMock
      .expectOne({
        method: "POST",
        url: URL
      })
      .flush(data, mockErrorResponse);

    expect(authenticationService.logout).toHaveBeenCalled();
    expect(location.reload).toHaveBeenCalled();
  });

  it("should throw a new error", () => {
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

    expect(errResponse).toBe("Unknown Error");
  });
});
