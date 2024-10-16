import { Instance, SnapshotOut, SnapshotIn, types, flow } from "mobx-state-tree"
import { AidRequestModel } from "./AidRequest"
import { api } from "app/services/api"
export const AidRequestStoreModel = types
  .model("AidRequestStore", {
    aidRequests: types.array(AidRequestModel),
    isLoading: types.boolean,
    error: types.maybe(types.string),
  })
  .actions((self) => ({
    fetchAidRequests: flow(function* () {
      self.isLoading = true
      self.error = undefined
      try {
        const response = yield api.getAidRequests()
        if (response.ok) {
          self.aidRequests = response.data
        } else {
          self.error = response.problem
        }
      } catch (error: any) {
        self.error = error.message
      } finally {
        self.isLoading = false
      }
    }),
  }))
export interface AidRequestStoreInstance extends Instance<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshot extends SnapshotOut<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshotIn extends SnapshotIn<typeof AidRequestStoreModel> {}
