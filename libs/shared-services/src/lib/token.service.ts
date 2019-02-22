import { Injectable, Inject } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

import { JWT_INSTANCE } from "./shared-services.module";

@Injectable({
  providedIn: "root"
})
export class TokenService {
  static readonly TOKEN_STORAGE_KEY = "inspeerity-token";

  constructor(
    @Inject(JWT_INSTANCE) private jwtHelperService: JwtHelperService
  ) {}

  /**
   * Retrieves accessToken from local storage.
   * Returns undefined if token has expired.
   *
   * @type {string | undefined}
   * @readonly
   */
  get accessToken(): string | undefined {
    const token = this.getToken();
    const expired = this.jwtHelperService.isTokenExpired(token);
    return token && !expired ? token : undefined;
  }

  get userName(): string {
    const token = this.getToken();
    let userName = "";
    if (token) {
      const { firstName, lastName } = this.decodeToken(token);
      userName =
        firstName !== undefined && lastName !== undefined
          ? `${firstName} ${lastName}`
          : "";
    }
    return userName;
  }

  /**
   * Stores token in local storage.
   *
   * @param {string} token
   */
  setToken(token): void {
    localStorage.setItem(TokenService.TOKEN_STORAGE_KEY, token);
  }

  /**
   * Remove token from local storage
   */
  removeToken(): void {
    localStorage.removeItem(TokenService.TOKEN_STORAGE_KEY);
  }

  private decodeToken(token: string) {
    return this.jwtHelperService.decodeToken(token);
  }

  private getToken() {
    return localStorage.getItem(TokenService.TOKEN_STORAGE_KEY);
  }
}
