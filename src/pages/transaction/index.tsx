import * as React from 'react';
import StickyHeadTable from '@features/data-display/table';

interface ITransaction {}

const Transaction: React.FunctionComponent<ITransaction> = () => {
  return <StickyHeadTable />;
};

export default Transaction;
