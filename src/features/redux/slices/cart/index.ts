import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICartState, TLoading } from './type';
import { RootState } from '@features/redux/store';
import { getAllCart } from './cart.service';

const prefixType = 'cart';
const getAllCartAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllCart();
    console.log('🚀 ~ file: index.ts ~ line 11 ~ getAllCartAsyncThunk ~ dataResponse', dataResponse);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState: ICartState = {
  dataGetAll: [{}],
  dataGetOne: {},
  getAllLoading: 'idle',
  getOneLoading: 'idle',
  postLoading: 'idle',
  putLoading: 'idle',
  deleteLoading: 'idle',
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    resetCartState: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCartAsyncThunk.pending, (state, action) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllCartAsyncThunk.fulfilled, (state, action) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getAllLoading: 'failed',
        };
      }

      return {
        ...state,
        getAllLoading: 'succeeded',
        dataGetAll: action.payload.data,
      };
    });
    builder.addCase(getAllCartAsyncThunk.rejected, (state, action) => {
      return {
        ...state,
        getAllLoading: 'failed',
      };
    });
  },
});

export { getAllCartAsyncThunk };
export const getCartState = (state: RootState) => state.cartSlice;
export const { resetCartState } = cartSlice.actions;
export default cartSlice;
