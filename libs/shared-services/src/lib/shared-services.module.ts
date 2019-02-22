import { CommonModule } from '@angular/common';
import { NgModule, InjectionToken } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_INSTANCE = new InjectionToken<JwtHelperService>(
  'JWT_INSTANCE'
);

export const jwtServiceFactory = () => {
  return new JwtHelperService();
};

export const jwtProvider = {
  provide: JWT_INSTANCE,
  useFactory: jwtServiceFactory
};

@NgModule({
  imports: [CommonModule, MatSnackBarModule],
  exports: [MatSnackBarModule],
  providers: [jwtProvider]
})
export class SharedServicesModule {}
