// something needs to run repeatly
Cypress.Commands.add("login", () => {
  cy.visit("/react/e2e-test");
  cy.wait(500);
  cy.get("button").click();
  cy.wait(500);
});
