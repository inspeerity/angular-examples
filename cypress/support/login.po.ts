export class LoginPage {
  static url = `${Cypress.config("baseUrl")}${Cypress.env("api").login}`;

  get title() {
    return cy.get('[data-test="login-title"]');
  }
  get username() {
    return cy.get('input[data-test="login-username"]');
  }

  get password() {
    return cy.get('input[data-test="login-password"]');
  }

  get button() {
    return cy.get('[data-test="login-button"]');
  }

  get logo() {
    return cy.get('[data-test="login-logo"]');
  }

  get emailIcon() {
    return cy.get('[data-test="login-email-icon"]');
  }

  get lockIcon() {
    return cy.get('[data-test="login-lock-icon"]');
  }

  get errorMessage() {
    return cy.get('[data-test="login-error"]');
  }

  get authToken() {
    return localStorage.getItem("TOKEN");
  }

  navigateTo() {
    return cy.visit(LoginPage.url);
  }

  login(username, password) {
    this.username.type(username);
    this.password.type(password);
    this.button.click();
  }
}
