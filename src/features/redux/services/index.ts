import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IDataResponse {
  data: any
  isSussces: boolean
}

const { REACT_APP_API, REACT_APP_API_PUBLIC } = process.env

const apiPublicURL = fetchBaseQuery({ baseUrl: String(REACT_APP_API) })
const apiPrivateURL = fetchBaseQuery({ baseUrl: String(REACT_APP_API_PUBLIC) })

export { apiPublicURL, apiPrivateURL }
