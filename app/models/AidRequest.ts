import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const AidRequestModel = types
  .model("AidRequest", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
    type: types.string, // New field
    organizationId: types.string, // New field
    userId: types.string, // New field
    createdAt: types.Date,
    updatedAt: types.Date,
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export type AidRequest = Instance<typeof AidRequestModel>
export type AidRequestSnapshot = SnapshotOut<typeof AidRequestModel>
export type AidRequestSnapshotIn = SnapshotIn<typeof AidRequestModel>
