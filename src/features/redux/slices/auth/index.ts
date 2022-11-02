import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IAuthState, IAuth, IDataAuth, IDataSignin, TLoading } from './type'
import { signin } from './auth.service'
import { setItem } from '@features/utils/local.storage'
import { RootState } from '../../store'

const prefixType = 'auth'
const signinAsyncThunk = createAsyncThunk(`${prefixType}/signin`, async (data: { email: string; password: string }, thunkAPI) => {
  try {
    const dataResponse = await signin(data)
    console.log('🚀 ~ file: index.ts ~ line 12 ~ signinAsyncThunk ~ dataResponse', dataResponse)
    if (dataResponse) {
      return dataResponse
    }
    return dataResponse
  } catch (error: any) {
    console.log('🚀 ~ file: index.ts ~ line 14 ~ signinAsyncThunk ~ error', error)
    return thunkAPI.rejectWithValue(error)
  }
})

const initialState: IAuthState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: 'idle',
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload
    },
    resetAuthState: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(signinAsyncThunk.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      }
    })
    builder.addCase(signinAsyncThunk.fulfilled, (state, action) => {
      setItem('user', JSON.stringify(action.payload))

      return {
        ...state,
        loading: 'succeeded',
        auth: action.payload,
      }
    })
    builder.addCase(signinAsyncThunk.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
        auth: undefined,
      }
    })
  },
})

export { signinAsyncThunk }
export const getAuthState = (state: RootState) => state.authSlice
export const { setFirstName, setLastName, setEmail, setPassword, resetAuthState } = authSlice.actions
export default authSlice
