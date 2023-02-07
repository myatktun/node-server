import { render } from "@testing-library/react"

import Notelist from "./notelist"

describe("Notelist", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Notelist />)
        expect(baseElement).toBeTruthy()
    })
})
