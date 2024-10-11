import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
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
    error: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    createAidRequest: flow(function* (aidRequestPayload: AidRequestPayload) {
      store.setProp("isLoading", true)
      try {
        const response = yield api.createAidRequest(aidRequestPayload)
        console.log("Create Aid Request Response:", response) // Detailed log of the response
        if (response.kind === "ok") {
          store.aidRequests.push(response.data)
        } else {
          store.setProp("error", response.message || "Failed to create aid request")
        }
      } catch (error: any) {
        console.error("Create Aid Request Error:", error) // Log the error
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    updateAidRequest: flow(function* (
      aidRequestId: number,
      aidRequestUpdatePayload: AidRequestStatusUpdatePayload,
    ) {
      store.setProp("isLoading", true)
      try {
        const response = yield api.updateAidRequestStatus(aidRequestId, aidRequestUpdatePayload)
        console.log("Update Aid Request Response:", response) // Detailed log of the response
        if (response.kind === "ok") {
          const index = store.aidRequests.findIndex(
            (request) => Number(request.id) === aidRequestId,
          )
          if (index !== -1) {
            store.aidRequests[index] = response.data
          }
        } else {
          store.setProp("error", response.message || "Failed to update aid request")
        }
      } catch (error: any) {
        console.error("Update Aid Request Error:", error) // Log the error
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    deleteAidRequest: flow(function* (id: string) {
      store.setProp("isLoading", true)
      try {
        const response = yield api.deleteAidRequest(id)
        console.log("Delete Aid Request Response:", response) // Detailed log of the response
        if (response.kind === "ok") {
          store.setProp(
            "aidRequests",
            store.aidRequests.filter((request) => request.id !== id),
          )
        } else {
          store.setProp("error", response.message || "Failed to delete aid request")
        }
      } catch (error: any) {
        console.error("Delete Aid Request Error:", error) // Log the error
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    fetchAidRequests: flow(function* (token: string) {
      store.setProp("isLoading", true)
      try {
        api.setToken(token) // Set the token before making the API call
        const response = yield api.getAidRequests()
        console.log("API Response:", response) // Detailed log of the response
        if (response.kind === "ok" && Array.isArray(response.data)) {
          store.setProp(
            "aidRequests",
            response.data.map((item: AidRequestResponse) => AidRequestModel.create(item)),
          )
        } else {
          store.setProp("error", response.message || "Failed to fetch aid requests")
        }
      } catch (error: any) {
        console.error("Fetch Aid Requests Error:", error) // Log the error
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    // Other actions...
  }))

export interface AidRequestStore extends Instance<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshot extends SnapshotOut<typeof AidRequestStoreModel> {}
export const createAidRequestStoreDefaultModel = () =>
  types.optional(AidRequestStoreModel, {
    aidRequests: [],
    isLoading: false,
    error: undefined,
  })
