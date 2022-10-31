import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { setupListeners } from '@reduxjs/toolkit/query'
import { AuthApi } from '../services/auth'
import signupSlice from '@features/redux/slices/auth'

const middlewares = [AuthApi.middleware]

const rootReducer = combineReducers({
  [AuthApi.reducerPath]: AuthApi.reducer,
  [signupSlice.name]: signupSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend()
      .concat(logger, ...middlewares),
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
