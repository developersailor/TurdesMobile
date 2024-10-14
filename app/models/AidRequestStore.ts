import { Instance, SnapshotOut, SnapshotIn, types, flow } from "mobx-state-tree"
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
    // Flow for creating aid request
    createAidRequest: flow(function* (aidRequestPayload: AidRequestPayload) {
      self.setProp("isLoading", true)
      try {
        const response = yield api.createAidRequest(aidRequestPayload)
        if (response.kind === "ok") {
          self.aidRequests.push(AidRequestModel.create(response.data))
        } else {
          self.setProp("error", response.message || "Failed to create aid request")
        }
      } catch (error) {
        console.error("Create Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),

    // Flow for updating aid request status
    updateAidRequest: flow(function* (
      aidRequestId: string,
      aidRequestUpdatePayload: AidRequestStatusUpdatePayload,
    ) {
      self.setProp("isLoading", true)
      try {
        const response = yield api.updateAidRequestStatus(+aidRequestId, aidRequestUpdatePayload)
        if (response.kind === "ok") {
          const index = self.aidRequests.findIndex((request) => request.id === aidRequestId)
          if (index !== -1) {
            self.aidRequests[index] = AidRequestModel.create(response.data)
          }
        } else {
          self.setProp("error", response.message || "Failed to update aid request")
        }
      } catch (error) {
        console.error("Update Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),

    // Flow for deleting aid request
    deleteAidRequest: flow(function* (id: string) {
      self.setProp("isLoading", true)
      try {
        const response = yield api.deleteAidRequest(id)
        if (response.kind === "ok") {
          self.setProp(
            "aidRequests",
            self.aidRequests.filter((request) => request.id !== id),
          )
        } else {
          self.setProp("error", response.message || "Failed to delete aid request")
        }
      } catch (error) {
        console.error("Delete Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),

    // Flow for fetching aid requests
    fetchAidRequests: flow(function* () {
      self.setProp("isLoading", true)
      try {
        const response = yield api.getAidRequests()
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
    }),
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
