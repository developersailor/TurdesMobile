import { loadString, saveString } from "app/utils/storage"
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
    setStatus(newStatus: "idle" | "loading" | "success" | "error") {
      self.status = newStatus
    },
    setError(message: string) {
      self.errorMessage = message
    },
    clearError() {
      self.errorMessage = ""
    },
    async setToken(data: string) {
      const tokenFromStorage: string | null = await loadString("token")
      if (data !== null) {
        saveString("token", data)
      }
      return tokenFromStorage
    },
  }))
