import { AidRequestModel } from "./AidRequest"

test("can be created", () => {
  const instance = AidRequestModel.create({})

  expect(instance).toBeTruthy()
})
