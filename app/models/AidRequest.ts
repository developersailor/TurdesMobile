import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AidRequestModel = types.model("AidRequest", {
  id: types.identifier,
  title: types.string,
  description: types.string,
  status: types.string,
  type: types.string, // Yeni alan
  organizationId: types.string, // Yeni alan
  userId: types.string, // Yeni alan
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
    type: "", // Yeni alan
    organizationId: "", // Yeni alan
    userId: "", // Yeni alan
    createdAt: new Date(),
    updatedAt: new Date(),
  })
