import { Component, EventEmitter, OnInit, Output } from "@angular/core";

import { AuthenticationService } from "@inspeerity/pact-services";
import { TokenService } from "@inspeerity/shared-services";

@Component({
  selector: "ins-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggleEvent = new EventEmitter<void>();

  isAuthenticated: boolean;
  userName: string;

  constructor(
    private authenticationService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.authenticationService.authenticationState.subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.userName = this.tokenService.userName;
      }
    );
  }

  toggleSidenav() {
    this.sidenavToggleEvent.emit();
  }

  logout() {
    this.authenticationService.logout();
  }
}
