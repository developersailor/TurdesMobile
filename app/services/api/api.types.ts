/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  token?: string
  message?: string
}

export interface RegisterPayload {
  email: string
  password: string
  name: string
  phone: string
  role: string
}

export interface RegisterResponse {
  token: string
  refreshToken: string
}

export interface LogoutPayload {
  token: string
}
export interface User {
  id: number
  name: string
  email: string
  phone: string
  passwordHash: string
  role: string
  refreshToken: string
  createdAt: string
  updatedAt: string
}
export interface RegisterErrorResponse {
  message: string
  error: string
  statusCode: number
}

export interface RefreshPayload {
  refreshToken: string
}
export interface RefreshResponse {
  accessToken: string
}

export interface AidRequestResponse {
  id: string

  title: string

  description: string

  status: string

  type: string

  organizationId: string

  userId: string

  createdAt: Date

  updatedAt: Date
}

export interface AidRequestPayload {
  userId: number
  organizationId: number
  type: string
  description: string
  status: string
}

export interface AidRequestStatusUpdatePayload {
  id: number
  status: string
  deviceToken: string
}

export interface AidRequestStatusUpdateResponse {
  message: string
}
export interface AidRequestRemovePayload {
  id: number
}
export interface AidRequestRemoveResponse {
  message: string
}
export interface OrganizationPayload {
  id: number
  name: string
  address: string
  contactInfo: string
  createdAt: string
  updatedAt: string
}

export interface OrganizationResponse {
  id: number
  name: string
  address: string
  contactInfo: string
  createdAt: string
  updatedAt: string
}

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
