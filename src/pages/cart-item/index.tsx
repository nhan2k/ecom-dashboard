import * as React from 'react';
import StickyHeadTable from '@features/data-display/table';

interface ICartItem {}

const CartItem: React.FunctionComponent<ICartItem> = () => {
  return <StickyHeadTable />;
};

export default CartItem;
