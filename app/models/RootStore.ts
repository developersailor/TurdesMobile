import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AidRequestStoreModel } from "./AidRequestStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { AidRequestModel } from "./AidRequest"
import { AuthenticationModel } from "./Authentication"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  aidRequestStore: types.optional(AidRequestStoreModel, {
    aidRequests: [],
    isLoading: false,
  }),
  aidRequest: types.optional(AidRequestModel, {
    id: "",
    title: "",
    description: "",
    status: "",
    type: "",
    organizationId: "",
    userId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  }), // @demo remove-current-line
  authentication: types.optional(AuthenticationModel, {}), // @demo remove-current-line
  authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export type RootStore = Instance<typeof RootStoreModel>
/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
