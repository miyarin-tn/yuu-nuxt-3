import { AsyncData, AsyncDataOptions, UseFetchOptions } from 'nuxt/app'
import * as asyncData from 'nuxt/dist/app/composables/asyncData'
import { FetchError } from 'ofetch'
import { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import * as apiService from '@/services/api.service'
import { useAuthStore } from '@/stores/auth.store'
import { Credential } from '@/types/auth.type'
import { API_ROUTES } from '@/constants/api-routes'
import { APP_ROUTES } from '@/constants/app-routes'

function replaceRequest (request: string, yuuOptions: any) {
  // @ts-ignore
  if (request.indexOf('_w') && yuuOptions?.watchEffect) {
    // @ts-ignore
    Object.keys(yuuOptions?.watchEffect).forEach((key) => {
      // @ts-ignore
      request = request.replace(/_w\w+/g, yuuOptions?.watchEffect[key].value)
    })
  }
  return request
}

async function checkAndRefreshToken ({
  accessToken,
  refreshToken,
  requestUrl,
  keepAwaitIn = 200,
  maxLoopCounter = 1000,
}: any) {
  if (
    isAliveJWT(refreshToken) &&
    !isAliveJWT(accessToken) &&
    (!requestUrl.includes(API_ROUTES.AUTH_REFRESH) || !requestUrl.includes(API_ROUTES.AUTH_LOGIN))
  ) {
    const store = useAuthStore()
    // Is any other requesting API is refreshing token?
    if (!store.isRefreshingToken) {
      // Set the other requesting is waiting
      store.setRefreshingToken(true)

      // Request the refresh token on server-middleware of nuxt.
      const { data, error } = await apiService.customPost<Credential>(API_ROUTES.AUTH_REFRESH)

      if (!error.value) {
        // Update store value and response data on client memory
        store.setCredential(data.value)

        // Clear waiting
        store.setRefreshingToken(false)
        return data.value
      } else {
        console.log(error.value)
        // Clear waiting
        store.setRefreshingToken(false)
        throw error.value
      }
    }

    // Return immediately if keepAwait = 0
    if (!keepAwaitIn) {
      return
    }

    // The other requesting API is refreshing token, just waiting here.
    const isLoopChecking = async (ms: number, count: number): Promise<any> => {
      if (count > maxLoopCounter) {
        return
      }

      // Check refreshing token and waiting
      if (store.isRefreshingToken) {
        await new Promise(resolve => setTimeout(resolve, ms))
        return isLoopChecking(ms, count + 1)
      }
    }
    await isLoopChecking(keepAwaitIn, 0)
  }
}

export function useHttp<T> (
  yuuRequest: string,
  yuuOptions?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  let watchArr: any[] = []
  // @ts-ignore
  if (yuuRequest.indexOf('_w') && yuuOptions?.watchEffect) {
    // @ts-ignore
    watchArr = Object.values(yuuOptions?.watchEffect)
  }

  const config = useRuntimeConfig()

  return useFetch(() => replaceRequest(yuuRequest, yuuOptions), {
    baseURL: config.public.baseURL,
    ...yuuOptions,
    lazy,
    watch: watchArr,
    async onRequest ({ request, options }) {
      options.headers = options.headers || {}

      const { $i18n } = useNuxtApp()
      // @ts-ignore
      options.headers['Accept-Language'] = $i18n.locale.value || 'en'

      const store = useAuthStore()
      const accessToken = (store.getCredential?.accessToken || '')
      const refreshToken = (store.getCredential?.refreshToken || '')

      if (process.client) {
        if (accessToken) {
          try {
            const res = await checkAndRefreshToken({
              accessToken,
              refreshToken,
              requestUrl: yuuRequest,
            })
            // Token was expired & refreshed token successfully.
            if (res) {
              // Only set headers Authorization if request to API.
              // @ts-ignore
              options.headers.Authorization = `Bearer ${res.accessToken}`
            } else if (isAliveJWT(accessToken)) {
              // Keep the same header if nothing changed
              // @ts-ignore
              options.headers.Authorization = `Bearer ${accessToken}`
            }
          } catch (err: any) {
            if (err.data?.statusCode === 401) {
              navigateTo(APP_ROUTES.LOGIN)
            }
            throw err
          }
        }
      } else if (isAliveJWT(accessToken)) {
        // Keep the same header if nothing changed
        // @ts-ignore
        options.headers.Authorization = `Bearer ${accessToken}`
      }
    },
    onRequestError ({ request, options, error }) {
    },
    onResponse ({ request, response, options }) {
    },
    onResponseError ({ request, response, options }) {
      const statusCode = response?.status

      const { $i18n } = useNuxtApp()

      if (statusCode === 401) {
        throw createError({
          statusCode: 401,
          statusMessage: $i18n.t('UNAUTHORIZED'),
        })
      }
    },
  })
}

export function useAsyncHttp<T> (
  yuuKey: string,
  yuuRequest: string,
  yuuRequestOptions?: NitroFetchOptions<NitroFetchRequest, 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'> | undefined,
  yuuAsyncOptions?: AsyncDataOptions<any>,
  lazy = true,
): AsyncData<T | asyncData.PickFrom<T, asyncData.KeysOf<T>>, FetchError<any> | null> {
  let watchArr: any[] = []
  // @ts-ignore
  if (yuuRequest.indexOf('_w') && yuuAsyncOptions?.watchEffect) {
    // @ts-ignore
    watchArr = Object.values(yuuAsyncOptions?.watchEffect)
  }

  const config = useRuntimeConfig()

  return useAsyncData(
    yuuKey,
    () => $fetch(replaceRequest(yuuRequest, yuuAsyncOptions), {
      baseURL: config.public.baseURL,
      ...yuuRequestOptions,
      onRequest ({ request, options }) {
      },
      onRequestError ({ request, options, error }) {
      },
      onResponse ({ request, response, options }) {
      },
      onResponseError ({ request, response, options }) {
      },
    }),
    {
      ...yuuAsyncOptions,
      lazy,
      watch: watchArr,
    },
  )
}
