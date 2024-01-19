import { apiClient } from "./api-client"

class HttpService {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get<T>(token: string) {
    const controller = new AbortController()
    const request = apiClient.get<T>(this.endpoint, {
      signal: controller.signal,
      headers: {
        'x-auth-token': token
      }
    })

    return { request, cancel: () => controller.abort() }
  }
}

const create = (endpoint: string) => new HttpService(endpoint)
export default create
