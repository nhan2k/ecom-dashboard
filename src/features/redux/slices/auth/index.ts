import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, IAuth, IDataAuth, IDataSignin, TLoading } from './type';
import { signin } from './auth.service';
import { setItem, getItem } from '@features/utils/local.storage';
import { RootState } from '../../store';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const prefixType = 'auth';
const signinAsyncThunk = createAsyncThunk(`${prefixType}/signin`, async (data: { email: string; password: string }, thunkAPI) => {
  try {
    const dataResponse = await signin(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState: IAuthState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: 'idle',
  auth: getItem('user') ? true : false,
  decoded: undefined,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        firstName: action.payload,
      };
    },
    setLastName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastName: action.payload,
      };
    },
    setEmail: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    setPassword: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        password: action.payload,
      };
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        auth: action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<TLoading>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setDecoded: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        decoded: action.payload,
      };
    },
    resetAuthState: (state) => {
      return {
        ...state,
        initialState,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(signinAsyncThunk.pending, (state, action) => {
      return {
        ...state,
        loading: 'pending',
      };
    });
    builder.addCase(signinAsyncThunk.fulfilled, (state, action) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          loading: 'failed',
        };
      }
      const token: string = action.payload.data.accessToken;
      const decoded: any = jwt_decode(token);
      console.log('🚀 ~ file: index.ts ~ line 97 ~ builder.addCase ~ decoded', decoded);
      if (decoded) {
        delete decoded.aud;
        delete decoded.iss;
      }
      setItem('user', JSON.stringify(action.payload.data));
      setItem('role', JSON.stringify(decoded));
      return {
        ...state,
        loading: 'succeeded',
        auth: true,
        token: token,
        decoded: decoded,
      };
    });
    builder.addCase(signinAsyncThunk.rejected, (state, action) => {
      return {
        ...state,
        loading: 'failed',
      };
    });
  },
});

export { signinAsyncThunk };
export const getAuthState = (state: RootState) => state.authSlice;
export const { setFirstName, setLastName, setEmail, setPassword, resetAuthState, setLoading, setDecoded } = authSlice.actions;
export default authSlice;
