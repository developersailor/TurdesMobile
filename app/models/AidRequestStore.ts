import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { AidRequestPayload, AidRequestStatusUpdatePayload, api } from "../services/api"
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
    fetchAidRequests: flow(function* () {
      store.setProp("isLoading", true)
      try {
        const response = yield api.getAidRequests()
        if (response.kind === "ok") {
          store.setProp("aidRequests", response.data)
        } else {
          store.setProp("error", response.message)
        }
      } catch (error: any) {
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    createAidRequest: flow(function* (aidRequestPayload: AidRequestPayload) {
      store.setProp("isLoading", true)
      try {
        const response = yield api.createAidRequest(aidRequestPayload)
        if (response.kind === "ok") {
          store.aidRequests.push(response.data)
        } else {
          store.setProp("error", response.message)
        }
      } catch (error: any) {
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
        if (response.kind === "ok") {
          const index = store.aidRequests.findIndex(
            (request) => Number(request.id) === aidRequestId,
          )
          if (index !== -1) {
            store.aidRequests[index] = response.data
          }
        } else {
          store.setProp("error", response.message)
        }
      } catch (error) {
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
    deleteAidRequest: flow(function* (id: string) {
      store.setProp("isLoading", true)
      try {
        const response = yield api.deleteAidRequest(id)
        if (response.kind === "ok") {
          store.setProp(
            "aidRequests",
            store.aidRequests.filter((request) => request.id !== id),
          )
        } else {
          store.setProp("error", response.message)
        }
      } catch (error) {
        store.setProp("error", (error as Error).message)
      } finally {
        store.setProp("isLoading", false)
      }
    }),
  }))

export interface AidRequestStore extends Instance<typeof AidRequestStoreModel> {}
export interface AidRequestStoreSnapshot extends SnapshotOut<typeof AidRequestStoreModel> {}
