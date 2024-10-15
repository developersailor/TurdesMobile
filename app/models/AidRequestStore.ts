import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { AidRequestPayload, AidRequestStatusUpdatePayload, api } from "../services/api"
import { AidRequestModel } from "./AidRequest"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AidRequestStoreModel = types
  .model("AidRequestStore")
  .props({
    aidRequests: types.array(AidRequestModel),
    isLoading: types.optional(types.boolean, false),
    error: "",
  })
  .actions(withSetPropAction)
  .views((self) => ({
    getAidRequest() {
      return self.aidRequests
    },
  }))
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
        if (response.message !== 0 && response.data && Array.isArray(response.data)) {
          response.data.map((aidRequest) =>
            self.aidRequests.push(AidRequestModel.create(aidRequest)),
          )
        } else {
          console.error("Unexpected response format or failure", response)
          self.setProp(
            "error",
            typeof response.message === "string"
              ? response.message
              : "Failed to fetch aid requests",
          )
        }
      } catch (error) {
        console.error("Fetch Aid Requests Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },
  }))

export interface AidRequestStore extends Instance<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshot extends SnapshotOut<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshotIn extends SnapshotIn<typeof AidRequestStoreModel> {}
