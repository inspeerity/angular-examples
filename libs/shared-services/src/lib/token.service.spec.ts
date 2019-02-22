import { TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

import { JWT_INSTANCE, jwtProvider } from './shared-services.module';
import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService, jwtHelperService: JwtHelperService;
  const token = 'token';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenService, jwtProvider]
    });

    service = TestBed.get(TokenService);
    jwtHelperService = TestBed.get(JWT_INSTANCE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return undefined accesToken', () => {
    jest.spyOn(jwtHelperService, 'decodeToken').mockReturnValue(undefined);
    expect(service.accessToken).toBeUndefined();
  });

  it('should return accessToken', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue(token);
    jest.spyOn(jwtHelperService, 'isTokenExpired').mockReturnValue(false);

    expect(service.accessToken).toBe(token);
  });

  it('should set a new token', () => {
    jest.spyOn(localStorage, 'setItem');

    service.setToken(token);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      TokenService.TOKEN_STORAGE_KEY,
      token
    );
  });

  it('should remove a token from the local storage', () => {
    jest.spyOn(localStorage, 'removeItem');

    service.removeToken();

    expect(localStorage.removeItem).toHaveBeenCalledWith(
      TokenService.TOKEN_STORAGE_KEY
    );
  });
});
