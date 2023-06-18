import { AsyncData, AsyncDataOptions, UseFetchOptions } from 'nuxt/app'
import * as asyncData from 'nuxt/dist/app/composables/asyncData'
import { FetchError } from 'ofetch'
import { NitroFetchRequest, NitroFetchOptions } from 'nitropack'

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

  return useFetch(() => replaceRequest(yuuRequest, yuuOptions), {
    ...yuuOptions,
    lazy,
    watch: watchArr,
    onRequest ({ request, options }) {
    },
    onRequestError ({ request, options, error }) {
    },
    onResponse ({ request, response, options }) {
    },
    onResponseError ({ request, response, options }) {
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

  return useAsyncData(
    yuuKey,
    () => $fetch(replaceRequest(yuuRequest, yuuAsyncOptions), {
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
