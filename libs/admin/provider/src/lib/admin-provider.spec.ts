import { adminProvider } from "./admin-provider"

describe("adminProvider", () => {
    it("should work", () => {
        expect(adminProvider()).toEqual("admin-provider")
    })
})
