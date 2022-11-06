import * as React from 'react';
import StickyHeadTable from '@features/data-display/table';
import { useAppDispatch } from '@/features/hooks/reduxHooks';
import { getAllCartAsyncThunk } from '@/features/redux/slices/cart';

interface ICart {}

const Cart: React.FunctionComponent<ICart> = () => {
  const dispatch = useAppDispatch();

  dispatch(getAllCartAsyncThunk());

  return <StickyHeadTable />;
};

export default Cart;
