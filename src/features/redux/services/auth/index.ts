import { createApi } from '@reduxjs/toolkit/query/react'
import { apiPublicURL } from '@features/redux/services'
import { IDataAuth, IDataSignin } from './type'

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
      query: (data: IDataSignin) => ({
        url: '/api/v1',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    postGetLinkReset: builder.mutation({
      query: (data: IDataSignin) => ({
        url: '/api/v1/auth/reset-password',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    postLogout: builder.mutation({
      query: (data: IDataSignin) => ({
        url: '/api/v1/auth/logout',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const { usePostSignupMutation, usePostSigninMutation, usePostGetLinkResetMutation, usePostLogoutMutation } = AuthApi
