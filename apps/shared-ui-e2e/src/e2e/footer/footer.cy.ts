describe("shared-ui: SharedUiFooter component", () => {
    beforeEach(() => cy.visit("/iframe.html?id=shareduifooter--primary"))

    it("should render the component", () => {
        cy.get("h1").should("contain", "Welcome to SharedUiFooter!")
    })
})
