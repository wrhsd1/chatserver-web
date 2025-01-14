/*
 * @Author: cloudyi.li
 * @Date: 2023-03-23 13:51:37
 * @LastEditTime: 2023-04-21 16:21:26
 * @LastEditors: cloudyi.li
 * @FilePath: /chatserver-web/src/utils/request/axios.ts
 */
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { useAuthStore } from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
    // throw new Error(response.data.message)
  },
  (error) => {
    if (error.code === 'ERR_BAD_REQUEST')
      return Promise.reject(error.response.data)
    else
      return Promise.reject(error)
  },
)

export default service
