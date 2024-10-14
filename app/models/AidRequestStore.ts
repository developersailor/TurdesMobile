import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import {
  AidRequestPayload,
  AidRequestResponse,
  AidRequestStatusUpdatePayload,
  api,
} from "../services/api"
import { AidRequestModel } from "./AidRequest"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AidRequestStoreModel = types
  .model("AidRequestStore", {
    aidRequests: types.array(AidRequestModel),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    // Async function for creating aid request
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

    // Async function for updating aid request status
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

    // Async function for deleting aid request
    async deleteAidRequest(id: string) {
      self.setProp("isLoading", true)
      try {
        const response = await api.deleteAidRequest(id)
        if (response.kind === "ok") {
          self.setProp(
            "aidRequests",
            self.aidRequests.filter((request) => request.id !== id),
          )
        }
      } catch (error) {
        console.error("Delete Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },

    // Async function for fetching aid requests
    async fetchAidRequests() {
      self.setProp("isLoading", true)
      try {
        const response = await api.getAidRequests()
        if (response.kind === "ok" && Array.isArray(response.data)) {
          self.setProp(
            "aidRequests",
            response.data.map((item: AidRequestResponse) =>
              AidRequestModel.create({
                ...item,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt),
              }),
            ),
          )
        } else {
          self.setProp("error", response.kind || "Failed to fetch aid requests")
        }
      } catch (error) {
        console.error("Fetch Aid Requests Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    },
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
