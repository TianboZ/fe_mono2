describe("todos", () => {
  beforeEach(() => {
    cy.login();
  });

  // each `it`, refresh page
  it("add/remove/toggle todo", () => {
    // add first todo
    const todo1 = 222;
    cy.get(`[data-cy="todo-input"]`).type(todo1).type("{enter}");
    cy.contains(todo1).should("exist");

    cy.wait(500);

    // add second todo
    const todo2 = 333;
    cy.get(`[data-cy="todo-input"]`).type(todo2).type("{enter}");
    cy.contains(todo2).should("exist");

    cy.wait(500);

    cy.contains("Total Todos: 2").should("exist");

    // remove todo 1
    cy.get(`[data-cy="todo-${todo1}"] > button`).click();
    cy.contains(todo1).should("not.exist");

    cy.wait(500);

    // remove todo2
    // more complex syntax!
    cy.get(`[data-cy="todo-${todo2}"]`).within(() => {
      cy.get("button").click();
      cy.contains(todo2).should("not.exist");
    });

    cy.wait(500);

    // add todo3
    const todo3 = "toggle me";
    cy.get(`[data-cy="todo-input"]`).type(todo3).type("{enter}");
    cy.contains(todo3).should("exist");

    cy.wait(500);

    // toggle todo3
    cy.get(`[data-cy="todo-${todo3}"] > input`).check();
    cy.wait(500);
    cy.contains("Selected Todos: 1").should("exist");
    cy.get(`[data-cy="todo-${todo3}"] > input`).uncheck();
  });
});
