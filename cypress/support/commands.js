// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import { LoginPage } from './../support/login.po';

Cypress.Commands.add('login', (userType, options = {}) => {
  const page = new LoginPage();

  const types = {
    admin: {
      username: Cypress.env('admin_username'),
      password: Cypress.env('admin_password')
    },
    user: {
      username: 'user',
      password: 'admin1'
    }
  };

  const user = types[userType];

  page.navigateTo().then(() => page.login(user.username, user.password));

  // const url = Cypress.env('tokenUrl');

  // cy.request({
  //   url: url,
  //   method: 'POST',
  //   body: {
  //     email: user.username,
  //     password: user.password
  //   }
  // });
});
