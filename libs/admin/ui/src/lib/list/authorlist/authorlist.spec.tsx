import { render } from "@testing-library/react"

import Authorlist from "./authorlist"

describe("Authorlist", () => {
    it("should render successfully", () => {
        const { baseElement } = render(<Authorlist />)
        expect(baseElement).toBeTruthy()
    })
})
