describe("apis", () => {
  beforeEach(() => {
    cy.login();
  });

  // each it, refresh page
  it("apis", () => {
    cy.intercept(
      {
        method: "GET",
        url: "https://dummyjson.com/products/1",
      },
      { fixture: "prod1.json" }
    ).as("getProduct1"); // Add alias here
    // cy.wait("@getProduct1");
    cy.get("button");
  });
});
