import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, Grid, Stack, TextField } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getProductState, putProductAsyncThunk } from '@/features/redux/slices/product';
import { IDataProduct } from '@features/redux/slices/product/type';

const theme = createTheme();
type Inputs = {
  title: string;
};
interface IUpdateForm {
  id: number;
  handleCloseModalUpdate: any;
}
const UpdateForm: React.FC<IUpdateForm> = ({ id, handleCloseModalUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataProduct>();

  const { dataInput, putLoading, putError } = useAppSelector(getProductState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IDataProduct> = async (data) => {
    data = { ...dataInput };
    await dispatch(putProductAsyncThunk({ data, id }));
    if (putLoading === 'succeeded') {
      handleCloseModalUpdate();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Update Product
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <TextField {...register('title', { required: 'Required' })} error={errors.title ? true : false} id="outlined-error-helper-text" label="Title " placeholder="Enter Title" helperText={errors.title ? String(errors.title.message) : 'Required'} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField {...register('type')} type="number" variant="filled" error={errors.type ? true : false} id="outlined-error-helper-text" label="Type" placeholder="Enter Type" helperText={errors.type ? String(errors.type.message) : ''} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField {...register('quantity')} type="number" variant="filled" error={errors.quantity ? true : false} id="outlined-error-helper-text" label="Quantity" placeholder="Enter Quantity" helperText={errors.quantity ? String(errors.quantity.message) : ''} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField {...register('shop')} type="number" variant="filled" error={errors.title ? true : false} id="outlined-error-helper-text" label="Shop" placeholder="Enter shop" helperText={errors.shop ? String(errors.shop.message) : ''} fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography variant="h4">Choose Image</Typography>
                    <Button variant="contained" component="label" size="large">
                      Upload
                      <input hidden accept="image/*" multiple type="file" {...register('content')} />
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {putLoading === 'failed' ? (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">{putError}</Alert>
                    </Stack>
                  ) : (
                    <React.Fragment />
                  )}
                  <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    {putLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button variant="contained" style={{ padding: '1rem 3rem', margin: '0 1rem' }} type="submit">
                        <Typography variant="h5">Submit</Typography>
                      </Button>
                    )}
                    <Button variant="contained" style={{ padding: '1rem 3rem', margin: '0 1rem' }} color="secondary" onClick={() => handleCloseModalUpdate()}>
                      <Typography variant="h5">Cancel</Typography>
                    </Button>
                  </Container>
                </Grid>
              </Grid>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateForm;
