import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, Grid, Stack, TextField } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getProductMetaState, putProductMetaAsyncThunk, setKey, setProductId } from '@/features/redux/slices/product-meta';

const theme = createTheme();
type Inputs = {
  productId: number;
  key: string;
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
  } = useForm<Inputs>();

  const { dataInput, putLoading, putError } = useAppSelector(getProductMetaState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(putProductMetaAsyncThunk({ data, id }));
    if (putLoading === 'succeeded') {
      handleCloseModalUpdate();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Update ProductMeta
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('productId', { required: 'Required' })}
                    error={errors.productId ? true : false}
                    id="outlined-error-helper-text"
                    label="productId"
                    placeholder="Enter productId"
                    helperText={errors.productId ? String(errors.productId.message) : ''}
                    fullWidth
                    value={dataInput.productId}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setProductId(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('key', { required: 'Required' })}
                    error={errors.key ? true : false}
                    id="outlined-error-helper-text"
                    label="key"
                    placeholder="Enter key"
                    helperText={errors.key ? String(errors.key.message) : ''}
                    fullWidth
                    value={dataInput.key}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setKey(e.target.value))}
                  />
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
                      <Button variant="contained" type="submit" style={{ padding: '1rem 3rem' }}>
                        <Typography variant="h5">Submit</Typography>
                      </Button>
                    )}
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
