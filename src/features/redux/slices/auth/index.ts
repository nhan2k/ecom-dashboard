import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface SignUpState {
  firstName: string
  lastName: string
  email: string
  password: string
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
} as SignUpState

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload
    },
  },
})

export const { setFirstName, setLastName, setEmail, setPassword } = authSlice.actions
export default authSlice
