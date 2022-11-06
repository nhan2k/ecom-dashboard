import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@features/redux/slices/auth';
import cartSlice from '@features/redux/slices/cart';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
});
export default rootReducer;
