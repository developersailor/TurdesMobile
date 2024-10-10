import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationModel = types
  .model("Authentication", {
    token: types.maybe(types.string),
    authEmail: types.string,
    authPassword: types.string,
    confirmPassword: types.string,
    phone: types.string,
    name: types.string,
    role: types.string,
    status: types.optional(types.enumeration(["idle", "loading", "success", "error"]), "idle"),
    errorMessage: types.maybe(types.string),
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.token
    },
    get validationError() {
      if (self.authEmail.length === 0) return "Email can't be blank"
      if (self.authEmail.length < 6) return "Email must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(self.authEmail)) return "Must be a valid email address"
      return ""
    },
    get passwordValidationError() {
      if (self.authPassword.length === 0) return "Password can't be blank"
      if (self.authPassword.length < 6) return "Password must be at least 6 characters"
      if (self.authPassword !== self.confirmPassword) return "Passwords must match"
      return ""
    },
  }))
  .actions(withSetPropAction)
  .actions((self) => ({
    logout() {
      self.token = undefined
      self.authEmail = ""
      self.authPassword = ""
      self.confirmPassword = ""
      self.phone = ""
      self.name = ""
      self.role = "aid_recipient"
      self.status = "idle"
      self.errorMessage = undefined
    },
    setError(message: string) {
      self.errorMessage = message
    },
    setStatus(newStatus: "idle" | "loading" | "success" | "error") {
      self.status = newStatus
    },
  }))

export interface Authentication extends Instance<typeof AuthenticationModel> {}
export interface AuthenticationSnapshotOut extends SnapshotOut<typeof AuthenticationModel> {}
export interface AuthenticationSnapshotIn extends SnapshotIn<typeof AuthenticationModel> {}
export const createAuthenticationDefaultModel = () =>
  types.optional(AuthenticationModel, {
    token: "",
    authEmail: "",
    authPassword: "",
    confirmPassword: "",
    phone: "",
    name: "",
    role: "aid_recipient",
  })
