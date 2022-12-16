import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';

import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DataTable from 'react-data-table-component';
import { TableColumn } from 'react-data-table-component/dist/src/DataTable/types';
import DetailModal from './Detail';
import { codeEnum, codeMap, typeEnum, typeMap, modeEnum, modeMap, statusEnum, statusMap } from '@features/redux/slices/transaction/enum';
import ApproveModal from './ApproveModal';
import { getAllTransactionAsyncThunk, getTransactionState } from '@/features/redux/slices/transaction';

interface ITransaction {}

type DataRow = {
  orderId: number;
  code: string;
  type: number;
  mode: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};
const columns: TableColumn<DataRow>[] = [
  {
    name: 'Order Id',
    selector: (row) => row.orderId,
  },
  {
    name: 'Code',
    selector: (row) => String(codeMap.get(Number(row.code))),
  },
  {
    name: 'Type',
    selector: (row) => String(typeMap.get(Number(row.type))),
  },
  {
    name: 'Mode',
    selector: (row) => String(modeMap.get(Number(row.mode))),
  },
  {
    name: 'Status',
    selector: (row) => String(statusMap.get(Number(row.status))),
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
  // {
  //   button: true,
  //   cell: (row) => <DetailModal id={row.id} />,
  // },
  // {
  //   button: true,
  //   cell: (row) => <ApproveModal id={row.id} disabled={row.status > 2 ? true : false} />,
  // },
];

const Transaction: React.FunctionComponent<ITransaction> = () => {
  const dispatch = useAppDispatch();
  const { dataTransactionGetAll, getAllLoading } = useAppSelector(getTransactionState);

  React.useEffect(() => {
    dispatch(getAllTransactionAsyncThunk());
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
      {getAllLoading === 'succeeded' ? <DataTable columns={columns} data={dataTransactionGetAll} /> : <></>}
    </Paper>
  );
};

export default Transaction;
