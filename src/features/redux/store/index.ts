import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { setupListeners } from '@reduxjs/toolkit/query'
import rootReducer from '../reducers'
import middlewares from '../middlewares'

const store: EnhancedStore<any> = configureStore({
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
