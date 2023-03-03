import { dataProvider } from "./dataprovider"

describe("dataProvider", () => {
    it("should work", () => {
        expect(dataProvider()).toEqual("admin-provider")
    })
})
