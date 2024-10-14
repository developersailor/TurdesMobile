import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AidRequestModel = types.model("AidRequest", {
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

export interface AidRequest extends Instance<typeof AidRequestModel> {}
export interface AidRequestSnapshot extends SnapshotOut<typeof AidRequestModel> {}
export const createAidRequestDefaultModel = () =>
  types.optional(AidRequestModel, {
    id: "",
    title: "",
    description: "",
    status: "",
    type: "", // New field
    organizationId: "", // New field
    userId: "", // New field
    createdAt: new Date(),
    updatedAt: new Date(),
  })
