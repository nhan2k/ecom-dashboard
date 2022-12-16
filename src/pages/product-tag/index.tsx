import * as React from 'react';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getAllProductTagAsyncThunk, getProductTagState } from '@/features/redux/slices/product-tag';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { Typography } from '@mui/material';

interface IProductTag {}

const ProductTag: React.FunctionComponent<IProductTag> = () => {
  const dispatch = useAppDispatch();
  const { dataGetAll, getAllLoading } = useAppSelector(getProductTagState);

  React.useMemo(() => {
    dispatch(getAllProductTagAsyncThunk());
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
    columns = dataGetAll.length > 0 ? [...Object.keys(dataGetAll[0])] : [];
  }
  let hiddenCol: string[] = [];

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
      <TableContainer style={{ maxHeight: '100vh', overflow: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {getAllLoading === 'succeeded' ? (
                dataGetAll.length > 0 ? (
                  columns.map((column: any, index: number) => {
                    if (hiddenCol.includes(column)) {
                      return;
                    }
                    return (
                      <TableCell key={index}>
                        <Typography fontSize={'1.6rem'} textAlign={'center'}>
                          {column}
                        </Typography>
                      </TableCell>
                    );
                  })
                ) : (
                  <React.Fragment />
                )
              ) : (
                <React.Fragment />
              )}
              {dataGetAll.length > 0 ? (
                <TableCell>
                  <Typography fontSize={'1.6rem'} textAlign={'center'}>
                    Action
                  </Typography>
                </TableCell>
              ) : (
                <TableCell>
                  <Typography align="center" variant="h3">
                    Empty Data
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {getAllLoading === 'succeeded' ? (
              dataGetAll.length > 0 ? (
                dataGetAll.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {getAllLoading === 'succeeded' ? (
                        columns.map((column: any, indexCol: number) => {
                          if (hiddenCol.includes(column)) {
                            return;
                          }
                          const value = row[column];
                          return (
                            <React.Fragment key={indexCol}>
                              <TableCell>
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
              )
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

export default ProductTag;
