import { render } from "@testing-library/react"

import Thumb from "./thumb"

describe("Thumb", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Thumb />)
        expect(baseElement).toBeTruthy()
    })
})
