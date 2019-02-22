import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Matchers, PactWeb } from '@pact-foundation/pact-web';

import {
  BASE_API_URL,
  httpInterceptorProviders
} from '@capratio-web/interceptors';

import { SubscriptionService } from './subscription.service';

import * as ports from './../../../pact-ports';

describe('SubscriptionService', () => {
  let provider, service: SubscriptionService;
  const createdToken = '25e3ae11-d294-4a69-9421-2816df07b531';

  beforeAll(function(done) {
    provider = new PactWeb({
      consumer: 'capratio-web',
      provider: 'capratio-core-subscription',
      port: ports.subscription,
      host: '127.0.0.1'
    });

    setTimeout(done, 2000);

    provider.removeInteractions();
  });

  afterAll(function(done) {
    provider.finalize().then(
      function() {
        done();
      },
      function(err) {
        done.fail(err);
      }
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        SubscriptionService,
        httpInterceptorProviders,
        { provide: BASE_API_URL, useValue: '/api' }
      ]
    });
    service = TestBed.get(SubscriptionService);
  });

  afterEach(done => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('addSubscription()', () => {
    const email = 'test@example.com';

    beforeAll(done => {
      provider
        .addInteraction({
          state: `provider accepts a new subscription`,
          uponReceiving: 'a request to POST a new subscription',
          withRequest: {
            method: 'POST',
            path: SubscriptionService.URL,
            body: { email },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'X-API-VERSION': '1'
            }
          },
          willRespondWith: {
            status: 201,
            body: Matchers.somethingLike({
              id: createdToken
            }),
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }
        })
        .then(done, error => done.fail(error));
    });

    it('should create a new subscription', done => {
      service.addSubscription(email).subscribe(
        response => {
          expect(response).toEqual({ id: createdToken });
          done();
        },
        error => {
          done.fail(error);
        }
      );
    });
  });

  describe('confirmSubscription()', () => {
    const confirmationToken = '415e6ab3-390b-4937-8f8c-7e5ab98c931c';

    beforeAll(done => {
      provider
        .addInteraction({
          state: `provider accepts a new subscription confirmation`,
          uponReceiving: 'a request to PUT a new subscription confirmation',
          withRequest: {
            method: 'PUT',
            path: `${SubscriptionService.URL}/${confirmationToken}/confirmed`,
            body: {},
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'X-API-VERSION': '1'
            }
          },
          willRespondWith: {
            status: 200
          }
        })
        .then(done, error => done.fail(error));
    });

    it('should confirm a new subscription', done => {
      service.confirmSubscription(confirmationToken).subscribe(
        () => {
          done();
        },
        error => {
          done.fail(error);
        }
      );
    });
  });
});
