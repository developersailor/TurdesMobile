import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AuthenticationModel } from "./Authentication"
import { api } from "../services/api"
import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
} from "../services/api/api.types"
import { withSetPropAction } from "./helpers/withSetPropAction"
export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authentication: types.optional(AuthenticationModel, {}),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    login: flow(function* (payload: LoginPayload) {
      store.authentication.setStatus("loading")
      const response: { kind: string; data?: LoginResponse } = yield api.login(payload)
      if (response.data?.token) {
        store.authentication.setStatus("success")
      }
      if (response.data == null || response.data.token == null) {
        const errorMessage = response.kind !== "ok" ? response.kind : "Login failed"
        store.authentication.setError(errorMessage)
        store.authentication.setStatus("error")
      }
      console.log(response)
      return response
    }),
    register: flow(function* (payload: RegisterPayload) {
      store.authentication.setStatus("loading")
      const response: { kind: string; data?: RegisterResponse } = yield api.register(payload)
      if (response.kind === "ok" && response.data?.token) {
        store.authentication.setStatus("success")
      } else {
        const errorMessage = response.kind === "bad-data" ? response.kind : "Registration failed"
        store.authentication.setError(errorMessage)
        store.authentication.setStatus("error")
      }
      return response
    }),
    logout: flow(function* () {
      yield AsyncStorage.removeItem("token")
    }),
  }))
  .views((self) => ({
    get isAuthenticated() {
      return !!self.authentication.token
    },
  }))

export type AuthenticationStore = Instance<typeof AuthenticationStoreModel>
export type AuthenticationStoreSnapshot = SnapshotOut<typeof AuthenticationStoreModel>
