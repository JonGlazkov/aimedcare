import axios from 'axios'
import { env } from 'process'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

if (env.NEXT_PUBLIC_API_URL === 'http://localhost:3333') {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return config
  })
}
