import { of } from "rxjs";

import {
  createComponentFixture,
  provideMagicalMock
} from "@inspeerity/tools/testing";

import { AuthenticationService } from "@inspeerity/pact-services";
import { TokenService } from "@inspeerity/shared-services";

import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
  const authenticationServiceValue = {
    authenticationState: of(true),
    logout: jest.fn()
  };
  const fixture = createComponentFixture({
    component: HeaderComponent,
    providers: [
      {
        provide: AuthenticationService,
        useValue: authenticationServiceValue
      },
      provideMagicalMock(TokenService)
    ]
  });
  let authenticationService: AuthenticationService, tokenService: TokenService;

  beforeEach(async () => {
    await fixture.compile();
  });

  beforeEach(() => {
    authenticationService = fixture.get(AuthenticationService);
    tokenService = fixture.get(TokenService);
  });

  it("should create", () => {
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it("toggleSidenav() should emit a new value", () => {
    jest.spyOn(fixture.componentInstance.sidenavToggleEvent, "emit");

    fixture.componentInstance.toggleSidenav();

    expect(
      fixture.componentInstance.sidenavToggleEvent.emit
    ).toHaveBeenCalled();
  });

  it("should call logout method", () => {
    fixture.componentInstance.logout();

    expect(authenticationService.logout).toHaveBeenCalled();
  });
});
