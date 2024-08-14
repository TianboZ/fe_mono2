// something needs to run repeatly
Cypress.Commands.add("login", () => {
  cy.visit("/react/e2e-test");
  cy.get("button").click();
});
