import { render } from "@testing-library/react"

import Drawermenu from "./drawermenu"

describe("Drawermenu", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Drawermenu />)
        expect(baseElement).toBeTruthy()
    })
})
