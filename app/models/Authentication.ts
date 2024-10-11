import { types } from "mobx-state-tree"

export const AuthenticationModel = types
  .model({
    token: types.maybe(types.string),
    email: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    phone: types.optional(types.string, ""),
    status: types.optional(types.enumeration(["idle", "loading", "success", "error"]), "idle"),
    errorMessage: types.maybe(types.string),
  })
  .actions((self) => ({
    setProp(key: string, value: any) {
      ;(self as any)[key] = value
    },
    setError(message: string) {
      self.errorMessage = message
    },
    setStatus(newStatus: "idle" | "loading" | "success" | "error") {
      self.status = newStatus
    },
    setToken(token: string) {
      self.token = token
    },
  }))

export const createAuthenticationStore = () => AuthenticationModel.create({})
