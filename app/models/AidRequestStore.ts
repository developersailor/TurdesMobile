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
  .model("AidRequestself", {
    aidRequests: types.array(AidRequestModel),
    isLoading: types.optional(types.boolean, true),
    error: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    createAidRequest: flow(function* (aidRequestPayload: AidRequestPayload) {
      self.setProp("isLoading", true)
      try {
        const response = yield api.createAidRequest(aidRequestPayload)
        if (response.kind === "ok") {
          self.aidRequests.push(AidRequestModel.create(response.data))
        } else {
          self.setProp("error", response.message || "Failed to create aid request")
        }
      } catch (error: any) {
        console.error("Create Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),
    updateAidRequest: flow(function* (
      aidRequestId: number,
      aidRequestUpdatePayload: AidRequestStatusUpdatePayload,
    ) {
      self.setProp("isLoading", true)
      try {
        const response = yield api.updateAidRequestStatus(aidRequestId, aidRequestUpdatePayload)
        if (response.kind === "ok") {
          const index = self.aidRequests.findIndex((request) => Number(request.id) === aidRequestId)
          if (index !== -1) {
            self.aidRequests[index] = AidRequestModel.create(response.data)
          }
        } else {
          self.setProp("error", response.message || "Failed to update aid request")
        }
      } catch (error: any) {
        console.error("Update Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),

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
      } catch (error: any) {
        console.error("Delete Aid Request Error:", error)
        self.setProp("error", (error as Error).message || "An unexpected error occurred")
      } finally {
        self.setProp("isLoading", false)
      }
    }),
    fetchAidRequests: flow(function* () {
      self.setProp("isLoading", true)

      const response: { kind: string; data: AidRequestResponse[] } = yield api.getAidRequests()
      try {
        if (response.kind === "ok" && Array.isArray(response.data)) {
          self.aidRequests.push(...response.data.map(AidRequestModel.create))
        } else {
          self.setProp("error", response.kind || "Failed to fetch aid requests")
        }
      } catch (error: any) {
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
    error: undefined,
  })
