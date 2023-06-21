import { AsyncData, UseFetchOptions } from 'nuxt/app'
import { FetchError } from 'ofetch'
import { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import * as asyncData from 'nuxt/dist/app/composables/asyncData'

export function customGet<T> (
  request: string,
  options?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  return useHttp(request, {
    method: 'GET',
    ...options,
  }, lazy)
}

export function customPost<T> (
  request: string,
  payload?: any,
  options?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  return useHttp(request, {
    method: 'POST',
    body: payload,
    ...options,
  }, lazy)
}

export function customPut<T> (
  request: string,
  payload?: any,
  options?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  return useHttp(request, {
    method: 'PUT',
    body: payload,
    ...options,
  }, lazy)
}

export function customPatch<T> (
  request: string,
  payload?: any,
  options?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  return useHttp(request, {
    method: 'PATCH',
    body: payload,
    ...options,
  }, lazy)
}

export function customDelete<T> (
  request: string,
  options?: UseFetchOptions<any>,
  lazy = true,
): AsyncData<T, FetchError<any> | null> {
  return useHttp(request, {
    method: 'DELETE',
    ...options,
  }, lazy)
}

export function getAsyncPosts<T> (
  key: string,
  request: string,
  requestOptions?: NitroFetchOptions<NitroFetchRequest, 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace'> | undefined,
  asyncOptions?: asyncData.AsyncDataOptions<any>,
  lazy = true,
): AsyncData<T | asyncData.PickFrom<T, asyncData.KeysOf<T>>, FetchError<any> | null> {
  return useAsyncHttp(key, request, requestOptions, asyncOptions, lazy)
}
