import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { api } from "../services/api"
import { AuthenticationModel } from "./Authentication"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authentication: types.optional(AuthenticationModel, {
      authToken: undefined,
      authEmail: "",
      authPassword: "",
    }), // Default value added here
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    login: flow(function* (email: string, password: string) {
      try {
        const response = yield api.login({ email, password })
        if (response.kind === "ok") {
          store.authentication.setProp("authToken", response.data.token)
          store.authentication.setProp("authEmail", email)
          return { kind: "ok" }
        } else {
          return { kind: "error", message: response.kind }
        }
      } catch (error) {
        return { kind: "error", message: (error as Error).message }
      }
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
