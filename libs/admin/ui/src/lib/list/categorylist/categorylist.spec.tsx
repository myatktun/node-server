import { render } from "@testing-library/react"

import Categorylist from "./categorylist"

describe("Categorylist", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Categorylist />)
        expect(baseElement).toBeTruthy()
    })
})
