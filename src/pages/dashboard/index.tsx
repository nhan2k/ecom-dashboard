import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Item from './Item';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { countProductAsyncThunk, getProductState } from '@features/redux/slices/product';
import { countTransactionAsyncThunk, getTransactionState } from '@features/redux/slices/transaction';
import { countOrderAsyncThunk, getOrderState } from '@features/redux/slices/order';
import productImg from './assets/images/product.png';
import orderImg from './assets/images/order.png';
import transactionImg from './assets/images/transaction.png';

interface IDashboard {}

const Dashboard: React.FunctionComponent<IDashboard> = () => {
  const dispatch = useAppDispatch();

  const getAllDashboard = () => {
    dispatch(countProductAsyncThunk());
    dispatch(countOrderAsyncThunk());
    dispatch(countTransactionAsyncThunk());
  };
  const productState = useAppSelector(getProductState);
  const orderState = useAppSelector(getOrderState);
  const transactionState = useAppSelector(getTransactionState);

  React.useMemo(() => {
    getAllDashboard();
  }, []);

  let states = [
    { state: productState, img: productImg, name: 'Product' },
    { state: orderState, img: orderImg, name: 'Order' },
    // { state: transactionState, img: transactionImg, name: 'Transaction' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {states.map((element: any, index) => {
          return (
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia component="img" height="140" image={element.img} alt="green iguana" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {element.state.countLoading === 'pending' ? (
                          <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                          </Box>
                        ) : (
                          ''
                        )}
                        {element.state.countLoading === 'failed' ? element.state.countError : ''}
                        {element.state.countLoading === 'succeeded' ? element.state.count : ''}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {element.name} Quantity Report
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Item>
            </Grid>
          );
        })}
        {/* <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
          <Item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={productImg} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {productState.countLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      ''
                    )}
                    {productState.countLoading === 'failed' ? productState.countError : ''}
                    {productState.countLoading === 'succeeded' ? productState.count : ''}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Product Quantity Report
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
          <Item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={orderImg} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {orderState.countLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      ''
                    )}
                    {orderState.countLoading === 'failed' ? orderState.countError : ''}
                    {orderState.countLoading === 'succeeded' ? orderState.count : ''}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Order Count Report
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={4} xl={3}>
          <Item>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia component="img" height="140" image={transactionImg} alt="green iguana" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {transactionState.countLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      ''
                    )}
                    {transactionState.countLoading === 'failed' ? transactionState.countError : ''}
                    {transactionState.countLoading === 'succeeded' ? transactionState.count : ''}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Transaction Count Report
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Item>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Dashboard;
