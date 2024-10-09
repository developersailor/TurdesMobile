import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationModel = types
  .model("Authentication", {
    authToken: types.maybe(types.string),
    authEmail: types.string,
    authPassword: types.string,
  })
  .views((self) => ({
    get isAuthenticated() {
      return !!self.authToken
    },
    get validationError() {
      if (self.authEmail.length === 0) return "can't be blank"
      if (self.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(self.authEmail)) return "must be a valid email address"
      return ""
    },
  }))
  .actions(withSetPropAction)
  .actions((self) => ({
    logout() {
      self.authToken = undefined
      self.authEmail = ""
      self.authPassword = ""
    },
  }))
export interface Authentication extends Instance<typeof AuthenticationModel> {}
export interface AuthenticationSnapshotOut extends SnapshotOut<typeof AuthenticationModel> {}
export interface AuthenticationSnapshotIn extends SnapshotIn<typeof AuthenticationModel> {}
export const createAuthenticationDefaultModel = () =>
  types.optional(AuthenticationModel, {
    authToken: undefined,
    authEmail: "",
    authPassword: "",
  })
