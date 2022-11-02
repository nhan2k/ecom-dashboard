import { combineReducers } from '@reduxjs/toolkit'
import { AuthApi } from '@features/redux/services/auth'
import signupSlice from '@features/redux/slices/auth'

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [signupSlice.name]: signupSlice.reducer,
})

export default rootReducer
