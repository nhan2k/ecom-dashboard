import { createApi } from '@reduxjs/toolkit/query/react'
import { apiPublicURL, apiPrivateURL } from '@features/redux/services'

interface IDataAuth {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: apiPublicURL,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    postSignup: builder.mutation({
      query: (data: IDataAuth) => ({
        url: '/signup',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    postSignin: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: '/api/v1',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { usePostSignupMutation, usePostSigninMutation } = AuthApi
