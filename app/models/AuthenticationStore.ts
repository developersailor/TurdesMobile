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
import { GeneralApiProblem } from "app/services/api/apiProblem"
import { saveString } from "app/utils/storage"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore", {
    authentication: types.optional(AuthenticationModel, {}),
  })
  .actions((store) => ({
    login: flow(function* (
      payload: LoginPayload,
    ): Generator<
      Promise<{ kind: "ok"; data: LoginResponse } | GeneralApiProblem>,
      { kind: "ok"; data: LoginResponse } | GeneralApiProblem,
      { kind: "ok"; data: LoginResponse } | GeneralApiProblem
    > {
      store.authentication.setStatus("loading")
      try {
        const response = yield api.login(payload)
        if (response.kind === "ok" && response.data.token) {
          store.authentication.setToken(response.data.token)
          store.authentication.setStatus("success")
          saveString("token", response.data.token)
        } else {
          store.authentication.setError(
            response.kind !== "ok" ? response.kind || "Login failed" : "Login failed",
          )
          store.authentication.setStatus("error")
        }
        return response
      } catch (error: unknown) {
        store.authentication.setError((error as Error).message)
        store.authentication.setStatus("error")
        return {
          kind: "bad-data",
        }
      }
    }),
    register: flow(function* (
      payload: RegisterPayload,
    ): Generator<
      Promise<{ kind: "ok"; data: RegisterResponse } | GeneralApiProblem>,
      { kind: "ok"; data: RegisterResponse } | GeneralApiProblem,
      { kind: "ok"; data: RegisterResponse } | GeneralApiProblem
    > {
      store.authentication.setStatus("loading")
      try {
        const response = yield api.register(payload)
        if (response.kind === "ok") {
          store.authentication.setToken(response.data.token)
          store.authentication.setStatus("success")
        } else {
          store.authentication.setError(
            response.kind === "bad-data" ? response.kind : "Registration failed",
          )
          store.authentication.setStatus("error")
        }
        return response
      } catch (error: unknown) {
        store.authentication.setError((error as Error).message)
        store.authentication.setStatus("error")
        return {
          kind: "bad-data",
        }
      }
    }),
    loadToken: flow(function* () {
      const token = yield AsyncStorage.getItem("token")
      if (token) {
        store.authentication.setToken(token)
      }
    }),
    logout: flow(function* () {
      store.authentication.setToken("")
      yield AsyncStorage.removeItem("token")
    }),
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
