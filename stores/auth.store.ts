import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import * as apiService from '@/services/api.service'
import { Auth, Credential } from '@/types/auth.type'
import { API_ROUTES } from '@/constants/api-routes'
import { AUTH_ACCESS_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY } from '@/constants/config'

export const useAuthStore = defineStore('auth', () => {
  const authInfo: Auth = reactive({
    isAuthenticated: false,
    user: null,
    credential: {
      accessToken: null,
      refreshToken: null,
    },
  })

  const isAuthenticated = computed(() => authInfo.isAuthenticated)
  const getUserAuth = computed(() => authInfo.user)
  const getCredential = computed(() => authInfo.credential)

  function setAuthenticate (isAuth: boolean) {
    authInfo.isAuthenticated = isAuth
  }

  function setUserAuth (user: string | null) {
    authInfo.user = user
  }

  const isRefreshingToken = ref(false)

  function setRefreshingToken (isRefreshing: boolean) {
    isRefreshingToken.value = isRefreshing
  }

  function setCredential (credential: {
    accessToken: string | null
    refreshToken: string | null
  }) {
    authInfo.credential = credential
  }

  async function nuxtServerInit () {
    let accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
    let refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
    const credential = {
      accessToken: (accessTokenCookie.value || ''),
      refreshToken: (refreshTokenCookie.value || ''),
    }

    if (!isAliveJWT(credential.accessToken) && isAliveJWT(credential.refreshToken)) {
      const { data, error } = await apiService.customPost<Credential>(API_ROUTES.AUTH_REFRESH, {
        token: credential.refreshToken,
      })
      if (!error.value) {
        const accessToken: any = jwtDecode(data.value.accessToken)
        const refreshToken: any = jwtDecode(data.value.refreshToken)
        accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY, {
          expires: new Date(accessToken.exp * 1000),
        })
        accessTokenCookie.value = data.value.accessToken
        refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY, {
          expires: new Date(refreshToken.exp * 1000),
        })
        refreshTokenCookie.value = data.value.refreshToken
      } else {
        console.log(error.value)
        if (error.value?.statusCode === 401) {
          const accessTokenCookie = useCookie(AUTH_ACCESS_TOKEN_KEY)
          accessTokenCookie.value = undefined
          const refreshTokenCookie = useCookie(AUTH_REFRESH_TOKEN_KEY)
          refreshTokenCookie.value = undefined
        }
      }
    }

    if (isAliveJWT(credential.accessToken) && isAliveJWT(credential.refreshToken)) {
      setUserAuth(decodeJWT(credential.accessToken).user)
      setCredential(credential)
      setAuthenticate(true)
    }
  }

  return {
    authInfo,
    isAuthenticated,
    getUserAuth,
    getCredential,
    setAuthenticate,
    setUserAuth,
    setCredential,
    isRefreshingToken,
    setRefreshingToken,
    nuxtServerInit,
  }
})
