import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { api, RegisterPayload } from "../services/api"
import { AuthenticationModel } from "./Authentication"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authentication: AuthenticationModel,
    status: types.optional(types.string, "idle"), // "idle", "loading", "success", "error"
    errorMessage: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    setStatus(newStatus: string) {
      store.status = newStatus
    },
    setError(message: string) {
      store.errorMessage = message
    },
    login: flow(function* (email: string, password: string) {
      store.authentication.setStatus("loading") // Doğru kullanım
      try {
        const response = yield api.login({ email, password })
        if (response.kind === "ok") {
          store.authentication.setProp("authToken", response.data.token)
          store.authentication.setProp("authEmail", email)
          store.authentication.setStatus("success") // Doğru kullanım
          return { kind: "ok" }
        } else {
          store.authentication.setStatus("error") // Doğru kullanım
          store.authentication.setError("Login failed: " + response.kind) // Doğru kullanım
          return { kind: "error", message: response.kind }
        }
      } catch (error) {
        store.authentication.setStatus("error") // Doğru kullanım
        store.authentication.setError("Login error: " + (error as Error).message) // Doğru kullanım
        return { kind: "error", message: (error as Error).message }
      }
    }),
    // Diğer aksiyonlar...
    logout: flow(function* () {
      try {
        const token = store.authentication.authToken
        if (token) {
          const response = yield api.logout(token)
          if (response.kind === "ok") {
            store.authentication.logout() // Call the logout action from AuthenticationModel
          } else {
            console.error("Logout failed:", response.kind)
          }
        }
      } catch (error) {
        console.error("Logout error:", (error as Error).message)
      }
    }),
    register: flow(function* () {
      store.authentication.setStatus("loading") // Doğru kullanım
      try {
        const registerPayload: RegisterPayload = {
          email: store.authentication.authEmail,
          password: store.authentication.authPassword,
          phone: store.authentication.phone,
          name: store.authentication.name,
          role: "aid_recipient",
        }
        const response = yield api.register(registerPayload)
        if (response.kind === "ok") {
          store.authentication.setStatus("success") // Doğru kullanım
          return { kind: "ok" }
        } else {
          store.authentication.setStatus("error") // Doğru kullanım
          store.authentication.setError("Registration failed: " + response.kind) // Doğru kullanım
          return { kind: "error", message: response.kind }
        }
      } catch (error: any) {
        store.authentication.setStatus("error") // Doğru kullanım
        store.authentication.setError("Registration error: " + error.message) // Doğru kullanım
        return { kind: "error", message: error.message }
      }
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
