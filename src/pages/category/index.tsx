import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateModal from './CreateModal';
import { getAllCategoryAsyncThunk, getCategoryState } from '@/features/redux/slices/category';
import DataTable from 'react-data-table-component';
import { columns } from './columns';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
interface ICategory {}

const Category: React.FunctionComponent<ICategory> = () => {
  const dispatch = useAppDispatch();
  const { dataGetAll, getAllLoading } = useAppSelector(getCategoryState);

  React.useEffect(() => {
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>{getAllLoading === 'succeeded' ? <DataTable columns={columns} data={dataGetAll} /> : <></>}</Item>
        </Grid>
        <Grid item xs={6}>
          {/* <Item>{getAllLoading === 'succeeded' ? <DataTable columns={columns} data={dataGetAll} /> : <></>}</Item> */}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Category;
