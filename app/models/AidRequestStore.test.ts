import { AidRequestStoreModel } from "./AidRequestStore"

test("can be created", () => {
  const instance = AidRequestStoreModel.create({})

  expect(instance).toBeTruthy()
})
