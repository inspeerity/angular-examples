import { HomePage } from "./../support/home.po";
import { LoginPage } from "./../support/login.po";

describe("Login Page", () => {
  const page = new LoginPage();

  beforeEach(page.navigateTo);

  it("should not contain auth token in the local storage", () => {
    expect(page.authToken).not.to.exist;
  });

  it("should be able to log in as an administrator successfully", () => {
    page.login(Cypress.env("admin_username"), Cypress.env("admin_password"));
    cy.url().should(url => {
      expect(url).to.contain(HomePage.url);
      expect(page.authToken).to.exist;
    });
  });

  it("should NOT be able to log in with bad credentials", () => {
    page.login("bad", "bad1");
    cy.url().should("contain", LoginPage.url);
    expect(page.authToken).not.to.exist;
    page.errorMessage.contains(
      "Login failed. Please provide valid credentials."
    );
    page.button.should("have.attr", "disabled");
  });

  it("should display login page title", () => {
    page.title.contains("Sign in to UNSPSCAudit");
  });

  it("should display the placeholder for username input", () => {
    page.username.should("have.attr", "placeholder", "Email");
  });

  it("should display the placeholder for password input", () => {
    page.password.should("have.attr", "placeholder", "Password");
  });

  it("should display the email icon", () => {
    page.emailIcon.should("have.attr", "xlink:href", "#email");
  });

  it("should display the lock icon", () => {
    page.lockIcon.should("have.attr", "xlink:href", "#lock");
  });

  it("should display the logo", () => {
    expect(page.logo).to.exist;
  });

  it("sign in button should contain text", () => {
    page.button.contains("Sign in");
  });
});
