import * as apiService from './api.service'
import { UserLogin } from '@/types/auth.type'
import { API_ROUTES } from '@/constants/api-routes'

export function login (payload: { username: string, password: string }) {
  return apiService.customPost<UserLogin>(API_ROUTES.AUTH_LOGIN, payload)
}

export function logout () {
  return apiService.customPost(API_ROUTES.AUTH_LOGOUT)
}
