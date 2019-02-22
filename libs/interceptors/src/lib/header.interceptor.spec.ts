import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import { HeaderInterceptor } from './header.interceptor';

describe(`HeaderInterceptor`, () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should NOT extend the request headers', () => {
    const URL = '/test';
    http.post(URL, {}).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne({
      method: 'POST',
      url: URL
    });

    expect(httpRequest.request.headers.get('Content-Type')).not.toBe(
      'application/json;charset=UTF-8'
    );
    expect(httpRequest.request.headers.get('X-API-VERSION')).not.toBe('1');
  });

  it('should extend the request headers', () => {
    const URL = '/api/test';
    http.post(URL, {}).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne({
      method: 'POST',
      url: URL
    });

    expect(httpRequest.request.headers.get('Content-Type')).toBe(
      'application/json;charset=UTF-8'
    );
    expect(httpRequest.request.headers.get('X-API-VERSION')).toBe('1');
  });

  it('should NOT extend the request headers when "Content-Type" exist', () => {
    const URL = '/api/test';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    http.post(URL, {}, { headers }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne({
      method: 'POST',
      url: URL
    });

    expect(httpRequest.request.headers.get('Content-Type')).toBe(
      'application/x-www-form-urlencoded'
    );
    expect(httpRequest.request.headers.get('X-API-VERSION')).toBe('1');
  });
});
