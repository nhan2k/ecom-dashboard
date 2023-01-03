import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAllOrderAsyncThunk, getOrderState } from '@/features/redux/slices/order';

import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types';
import DetailModal from './Detail';
import { statusEnum, statusMap } from '@features/redux/slices/order/enum';
import ApproveModal from './ApproveModal';

interface IOrder {}

type DataRow = {
  id: number;
  email: string;
  total: number;
  status: number;
  createdAt: string;
  updatedAt: string;
};
const columns: TableColumn<DataRow>[] = [
  {
    name: 'Order Id',
    selector: (row) => row.id,
  },
  {
    name: 'Total',
    selector: (row) => `$${row.total}`,
  },
  {
    name: 'Status',
    selector: (row) => String(statusMap.get(row.status)),
    maxWidth: '0.5rem',
  },
  {
    name: 'Buyer',
    selector: (row) => row.email,
    maxWidth: '0.5rem',
  },

  {
    name: 'Created At',
    selector: (row) => new Date(row.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', day: 'numeric', month: 'numeric' }),
    sortable: true,
  },
  {
    name: 'Updated At',
    selector: (row) => new Date(row.updatedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', day: 'numeric', month: 'numeric' }),
    sortable: true,
  },
  {
    button: true,
    cell: (row) => <DetailModal id={row.id} />,
  },
  {
    button: true,
    cell: (row) => <ApproveModal id={row.id} disabled={row.status > 2 ? true : false} />,
  },
];

const Order: React.FunctionComponent<IOrder> = () => {
  const dispatch = useAppDispatch();
  const { dataGetAll, getAllLoading } = useAppSelector(getOrderState);

  React.useEffect(() => {
    dispatch(getAllOrderAsyncThunk());
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {getAllLoading === 'pending' ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment />
      )}
      {getAllLoading === 'succeeded' ? <DataTable columns={columns} data={dataGetAll} /> : <></>}
    </Paper>
  );
};

export default Order;
