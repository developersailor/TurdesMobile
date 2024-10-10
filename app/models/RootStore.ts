import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AidRequestStoreModel } from "./AidRequestStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  aidRequestStore: types.optional(AidRequestStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {
    authentication: {
      token: "",
      authEmail: "",
      authPassword: "",
      confirmPassword: "",
      phone: "",
      name: "",
      role: "aid_recipient",
      status: "idle",
      errorMessage: undefined,
    },
    status: "idle",
    errorMessage: undefined,
  }),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
