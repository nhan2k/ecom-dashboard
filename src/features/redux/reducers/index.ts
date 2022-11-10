import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '@features/redux/slices/auth';
import cartSlice from '@features/redux/slices/cart';
import productSlice from '@features/redux/slices/product';
import categorySlice from '@features/redux/slices/category';
import productCategorySlice from '@features/redux/slices/product-category';
import userSlice from '@features/redux/slices/user';
import productMetaSlice from '@features/redux/slices/product-meta';
import orderSlice from '@features/redux/slices/order';
import tagSlice from '@features/redux/slices/tag';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [productCategorySlice.name]: productCategorySlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [productMetaSlice.name]: productMetaSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [tagSlice.name]: tagSlice.reducer,
});
export default rootReducer;
