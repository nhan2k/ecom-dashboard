import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAllCartAsyncThunk } from '@/features/redux/slices/cart';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getCartState } from '@features/redux/slices/cart';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

interface ICart {}

const Cart: React.FunctionComponent<ICart> = () => {
  const dispatch = useAppDispatch();
  const { dataInput, dataGetAll, dataGetOne, getAllLoading, getOneLoading, postLoading, putLoading, deleteLoading, getAllError, getOneError, postError, putError, deleteError } = useAppSelector(getCartState);

  React.useEffect(() => {
    let flag = true;
    if (flag) {
      dispatch(getAllCartAsyncThunk());
    }

    return () => {
      flag = false;
    };
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let columns: any[] = [];
  if (getAllLoading === 'succeeded') {
    columns = [...Object.keys(dataGetAll[0])];
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CreateModal />
      </Box>
      {getAllLoading === 'pending' ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <React.Fragment />
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {getAllLoading === 'succeeded' ? (
                columns.map((column: any, index: number) => {
                  return (
                    <TableCell key={index} sx={{ display: column === 'id' ? 'none' : '' }}>
                      <Typography fontSize={'1.6rem'} textAlign={'center'}>
                        {column}
                      </Typography>
                    </TableCell>
                  );
                })
              ) : (
                <React.Fragment />
              )}
              <TableCell>
                <Typography fontSize={'1.6rem'} textAlign={'center'}>
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getAllLoading === 'succeeded' ? (
              dataGetAll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {getAllLoading === 'succeeded' ? (
                      columns.map((column: any, indexCol: number) => {
                        const value = row[column];
                        return (
                          <React.Fragment key={indexCol}>
                            <TableCell sx={{ display: column === 'id' ? 'none' : '' }}>
                              <Typography fontSize={'1.3rem'}>{value}</Typography>
                            </TableCell>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <React.Fragment />
                    )}
                    <TableCell style={{ display: 'flex' }}>
                      <UpdateModal id={row.id} />
                      <DeleteModal id={row.id} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <React.Fragment />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination rowsPerPageOptions={[10, 25, 100]} component="div" count={dataGetAll.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
    </Paper>
  );
};

export default Cart;