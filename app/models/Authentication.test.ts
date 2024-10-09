import { AuthenticationModel } from "./Authentication"

test("can be created", () => {
  const instance = AuthenticationModel.create({})

  expect(instance).toBeTruthy()
})
