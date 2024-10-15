/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/test/setup.ts"],
}
jest.mock("../services/api", () => ({
  api: {
    createAidRequest: jest.fn(),
    updateAidRequestStatus: jest.fn(),
    deleteAidRequest: jest.fn(),
    getAidRequests: jest.fn(),
  },
}))
