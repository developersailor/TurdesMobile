/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApiResponse, ApisauceInstance, create } from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem"
import type {
  ApiConfig,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  RefreshPayload,
  RefreshResponse,
  AidRequestResponse,
  AidRequestPayload,
  AidRequestStatusUpdatePayload,
  OrganizationResponse,
  LoginPayload,
} from "./api.types"
import { loadString, saveString } from "app/utils/storage"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig
  authToken: string | null = null // To store the auth token

  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        Authorization: this.authToken,
      },
    })
  }

  /**
   * Set the auth token and update the Authorization header
   */
  async setAndCheckAuthToken(token: string | null) {
    const tokenFromStorage: string | null = await loadString("token")
    if (tokenFromStorage) {
      this.authToken = tokenFromStorage
      this.apisauce.setHeaders({
        Authorization: `Bearer ${tokenFromStorage}`,
      })
    } else if (token === null) {
      this.authToken = token
      this.apisauce.setHeaders({
        Authorization: `Bearer ${token}`,
      })
      if (token !== null) {
        saveString("token", token)
      }
    }
    return token
  }

  /**
   * Clear the auth token and remove the Authorization header
   */
  clearAuthToken() {
    this.authToken = null
    this.apisauce.setHeaders({
      Authorization: "",
    })
  }

  async login(
    payload: LoginPayload,
  ): Promise<{ kind: "ok"; data: LoginResponse } | GeneralApiProblem> {
    const response: ApiResponse<LoginResponse> = await this.apisauce.post(
      "/api/auth/login",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      this.setAndCheckAuthToken(response.data.token ?? null)
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  // Similar changes for register
  async register(
    payload: RegisterPayload,
  ): Promise<{ kind: "ok"; data: RegisterResponse } | GeneralApiProblem> {
    const response: ApiResponse<RegisterResponse> = await this.apisauce.post(
      "/api/auth/register",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  async refreshToken(
    payload: RefreshPayload,
  ): Promise<{ kind: "ok"; data: RefreshResponse } | GeneralApiProblem> {
    const response: ApiResponse<RefreshResponse> = await this.apisauce.post(
      "/api/auth/refresh",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  async logout(): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<unknown> = await this.apisauce.post("/api/auth/logout", {
      token: this.authToken,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    // Clear the auth token after logout
    this.clearAuthToken()
    return { kind: "ok" }
  }

  async getAidRequests(): Promise<{ kind: "ok"; data: AidRequestResponse[] } | GeneralApiProblem> {
    const response: ApiResponse<AidRequestResponse[]> = await this.apisauce.get("/api/aidrequests")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  async createAidRequest(
    payload: AidRequestPayload,
  ): Promise<{ kind: "ok"; data: AidRequestResponse } | GeneralApiProblem> {
    const response: ApiResponse<AidRequestResponse> = await this.apisauce.post(
      "/api/aidrequests",
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  async deleteAidRequest(id: string): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response: ApiResponse<unknown> = await this.apisauce.delete(`/api/aidrequests/${id}`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok" }
  }

  async updateAidRequestStatus(
    id: number,
    payload: AidRequestStatusUpdatePayload,
  ): Promise<{ kind: "ok"; data: AidRequestResponse } | GeneralApiProblem> {
    const response: ApiResponse<AidRequestResponse> = await this.apisauce.put(
      `/api/aidrequests/${id}/status`,
      payload,
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }

  async getOrganizations(): Promise<
    { kind: "ok"; data: OrganizationResponse[] } | GeneralApiProblem
  > {
    const response: ApiResponse<OrganizationResponse[]> = await this.apisauce.get(
      "/api/organizations",
    )
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    if (response.data) {
      return { kind: "ok", data: response.data }
    } else {
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
