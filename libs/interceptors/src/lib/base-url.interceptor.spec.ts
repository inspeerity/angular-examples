import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { BaseUrlInterceptor } from './base-url.interceptor';
import { BASE_API_URL } from './';

describe(`BaseUrlInterceptor`, () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BASE_API_URL, useValue: '/api' },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BaseUrlInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should extend the url', () => {
    const URL = '/test';
    http.post(URL, {}).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne({
      method: 'POST',
      url: '/api/test'
    });

    expect(httpRequest.request.url).toBe(`/api/test`);
  });
});
