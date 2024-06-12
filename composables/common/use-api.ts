import { getDeviceHeaders } from '~/utils'
import { type FetchOptions } from 'ofetch'
import { hash } from 'ohash'
import type { IParam, IErrorResponse, IApiResponse } from '@/types/api'
import { STATUS_CODE } from '@/constants/common'

export const useApi = async (url: string, payload?: IParam) => {
  const { os, device, browser } = getDeviceHeaders()
  const opts = {
    key: hash(['api-fetch', url, payload]),
    retry: 0,
    async onRequest({ options }: { options: FetchOptions }): Promise<void> {
      options.headers = options.headers ?? {}
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'x-rapidapi-key': useRuntimeConfig().public.rapidapi,
        os,
        device,
        browser
      }
    },
    ...payload,
    lazy: false
  }

  try {
    return (await $fetch(url, opts)) as IApiResponse
  } catch (error) {
    const typedError = error as IErrorResponse
    const code =
      typedError.response && typedError.response.status
        ? parseInt(typedError.response.status.toString(), 10)
        : undefined
    const message = typedError.response && typedError.response._data ? typedError.response._data.message : ''

    /*todo
    if (code === STATUS_CODE.UNAUTHORIZED) {
      //open modal error, etc...
    }
    */

    throw createError({
      statusCode: code,
      statusMessage: message
    })
  }
}
