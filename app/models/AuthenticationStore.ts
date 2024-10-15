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
import { saveString } from "app/utils/storage"
export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authentication: types.optional(AuthenticationModel, {}),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    login: flow(function* (payload: LoginPayload) {
      store.authentication.setStatus("loading")
      try {
        const response: { kind: string; data?: LoginResponse } = yield api.login(payload)
        if (response.data?.token) {
          saveString("token", response.data.token)
        }
        if (response.data == null || response.data.token == null) {
          const errorMessage = response.kind !== "ok" ? response.kind : "Login failed"
          store.authentication.setError(errorMessage)
          store.authentication.setStatus("error")
        }
        console.log(response)
        return response
      } catch (error: any) {
        store.authentication.setError(error.message)
        store.authentication.setStatus("error")
        return {
          kind: "bad-data",
        }
      }
    }),
    register: flow(function* (payload: RegisterPayload) {
      store.authentication.setStatus("loading")
      try {
        const response: { kind: string; data?: RegisterResponse } = yield api.register(payload)
        if (response.kind === "ok" && response.data?.token) {
          store.authentication.setStatus("success")
        } else {
          const errorMessage = response.kind === "bad-data" ? response.kind : "Registration failed"
          store.authentication.setError(errorMessage)
          store.authentication.setStatus("error")
        }
        return response
      } catch (error: any) {
        store.authentication.setError(error.message)
        store.authentication.setStatus("error")
        return {
          kind: "bad-data",
        }
      }
    }),
    loadToken: flow(function* () {
      const token = yield AsyncStorage.getItem("token")

      return token
    }),
    logout: flow(function* () {
      yield AsyncStorage.removeItem("token")
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
