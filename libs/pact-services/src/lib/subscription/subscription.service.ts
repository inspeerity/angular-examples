import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  static readonly URL = '/subscription';

  constructor(private http: HttpClient) {}

  addSubscription(email: string) {
    return this.http.post(SubscriptionService.URL, { email });
  }

  confirmSubscription(token: string) {
    return this.http.put(`${SubscriptionService.URL}/${token}/confirmed`, {});
  }
}
