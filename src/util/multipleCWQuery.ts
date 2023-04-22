import { getConfig } from '@/util/yamlConfigLoader'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

interface AxiosQuery {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}

const axiosQuery = async ({ url, method, data, params }: AxiosQuery) => {
  const apiKey = getConfig().climateWarehouseApiKey
  try {
    const result = await axios({
      url: url,
      method,
      data,
      params,
      timeout: getConfig().apiTimeout || 20 * 1000,
      headers: apiKey ? {"x-api-key": apiKey} : {}
    })
    return { data: result.data }
  } catch (axiosError) {
    let err = axiosError as AxiosError
    return {
      error: {
        status: err.response?.status,
      },
    }
  }
}

const multipleCWQuery =
  (): BaseQueryFn<AxiosQuery, unknown, unknown> =>
  async ({ url, method, data, params }) => {
    const serviceUrls = getConfig().climateWarehouses || []

    const resArray = await Promise.all(
      serviceUrls.map((baseUrl) =>
        axiosQuery({ url: baseUrl + url, method, data, params })
      )
    )

    if (resArray.length > 0) {
      const reduceData = resArray
        .map((res) => res?.data)
        .reduce(
          (previousValue, currentValue, currentIndex) => {
            // if currentValue is null skip
            if (!currentValue) {
              return previousValue
            }
            // if currentIndex=0 set init type array or object
            let data = previousValue.data
            if (currentIndex === 0) {
              data = Array.isArray(currentValue) ? [] : {}
            }

            if (Array.isArray(currentValue)) {
              return {
                data: [...data, ...currentValue],
              }
            }
            return {
              data: { ...data, ...currentValue },
            }
          },
          { data: undefined }
        )

      return reduceData
    }

    return { data: undefined }
  }

export default multipleCWQuery
