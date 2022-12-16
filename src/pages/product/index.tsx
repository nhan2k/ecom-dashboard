import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAllProductAsyncThunk, getProductState } from '@/features/redux/slices/product';

import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import DataTable from 'react-data-table-component';
import { columns } from './columns';
import CreateModal from './CreateModal';
import { getAllCategoryAsyncThunk } from '@/features/redux/slices/category';

interface IProduct {}

const Product: React.FunctionComponent<IProduct> = () => {
  const dispatch = useAppDispatch();
  const { dataGetAll, getAllLoading } = useAppSelector(getProductState);

  React.useEffect(() => {
    dispatch(getAllProductAsyncThunk());
    dispatch(getAllCategoryAsyncThunk());
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CreateModal />
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

export default Product;
