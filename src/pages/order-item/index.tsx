import * as React from 'react';
import StickyHeadTable from '@features/data-display/table';

interface IOrderItem {}

const OrderItem: React.FunctionComponent<IOrderItem> = () => {
  return <StickyHeadTable />;
};

export default OrderItem;
