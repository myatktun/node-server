describe("shared-ui: MenuBar component", () => {
    beforeEach(() => cy.visit("/iframe.html?id=menubar--primary"))

    it("should render the component", () => {
        cy.get("h1").should("contain", "Welcome to MenuBar!")
    })
})
