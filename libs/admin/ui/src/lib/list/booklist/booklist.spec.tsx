import { render } from "@testing-library/react"

import Booklist from "./booklist"

describe("Booklist", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Booklist />)
        expect(baseElement).toBeTruthy()
    })
})
