describe("shared-ui-header: SharedUiHeader component", () => {
    beforeEach(() =>
        cy.visit("/iframe.html?id=shareduiheader--primary&args=Name;")
    )

    it("should render the component", () => {
        cy.get("h1").should("contain", "Welcome to SharedUiHeader")
    })
})
