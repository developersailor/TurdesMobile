import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { AidRequestPayload, AidRequestStatusUpdatePayload, api } from "../services/api"
import { AidRequestModel } from "./AidRequest"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AidRequestStoreModel = types
  .model("AidRequestStore", {
    aidRequests: types.array(AidRequestModel), // Stores the array of AidRequests
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    async createAidRequest(aidRequestPayload: AidRequestPayload) {
      self.setProp("isLoading", true)
      try {
        const response = await api.createAidRequest(aidRequestPayload)
        if (response.kind === "ok") {
          self.aidRequests.push(AidRequestModel.create(response.data))
        }
      } catch (error) {
        console.error("Create Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },

    async updateAidRequest(
      aidRequestId: string,
      aidRequestUpdatePayload: AidRequestStatusUpdatePayload,
    ) {
      self.setProp("isLoading", true)
      try {
        const response = await api.updateAidRequestStatus(+aidRequestId, aidRequestUpdatePayload)
        if (response.kind === "ok") {
          const index = self.aidRequests.findIndex((request) => request.id === aidRequestId)
          if (index !== -1) {
            self.aidRequests[index] = AidRequestModel.create(response.data)
          }
        }
      } catch (error) {
        console.error("Update Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },

    async deleteAidRequest(id: string) {
      self.setProp("isLoading", true)
      const response = await api.deleteAidRequest(id)
      try {
        if (response.kind === "ok") {
          self.setProp(
            "aidRequests",
            self.aidRequests.filter((request) => request.id !== id),
          )
        }
        return response
      } catch (error) {
        console.error("Delete Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
        return error
      } finally {
        self.setProp("isLoading", false)
      }
    },
    async fetchAidRequests() {
      self.setProp("isLoading", true)
      const response = await api.getAidRequests()
      try {
        if (response.kind === "ok" && response.data !== null) {
          self.setProp(
            "aidRequests",
            response.data.map((item) => AidRequestModel.create(item)),
          )
        } else {
          self.setProp("error", response.kind || "Failed to fetch aid requests")
        }
      } catch (error) {
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },
  }))
  .views((self) => ({
    getAidRequest() {
      return self.aidRequests
    },
  }))

export interface AidRequestStore extends Instance<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshot extends SnapshotOut<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshotIn extends SnapshotIn<typeof AidRequestStoreModel> {}
export const createAidRequestStoreDefaultModel = () =>
  types.optional(AidRequestStoreModel, {
    aidRequests: [],
    isLoading: false,
    error: null,
  })
