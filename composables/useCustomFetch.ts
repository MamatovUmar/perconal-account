import { defu } from 'defu'
import type { FetchContext } from 'ofetch';
import type { FetchOptions } from 'ofetch';
import type { NitroFetchOptions } from 'nitropack';
import { ElMessage } from 'element-plus';

export function useCustomFetch<T> (url: string, options: FetchOptions = {}) {
  const token = useCookie('token')
  const config = useRuntimeConfig()

  const defaults: FetchOptions = {
    baseURL: config.public.baseUrl,

    onRequest(context: FetchContext): Promise<void> | void {
      if (token.value) {
        context.options.headers = { Authorization: `Bearer ${token.value}` }
      }
    },

    onResponse ({ request, options, response }) {
      const req = `%c ${options.method?.toUpperCase() ?? 'GET'}: ${request}`
      if (response.ok) {
        console.log(req, `background: green`, {response: response._data})
      } else {
        console.log(req, `background: red`)
        console.table(response._data)
      }
    },

    onResponseError({ response }: FetchContext): Promise<void> | void {
      ElMessage.error(response?.statusText)
      switch (response?.status) {
        case 401:
          token.value = null
      }
    }
  }

  const params = defu(options, defaults) as NitroFetchOptions<string>

  return $fetch<T>(url, params)
}
