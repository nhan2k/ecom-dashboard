import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { createTransactionAsyncThunk, getTransactionState, setCode, setOrderId, setPostModal } from '@/features/redux/slices/transaction';

const theme = createTheme();
type Inputs = {
  orderId: number;
  code: string;
};

interface ICreateForm {}
const CreateForm: React.FC<ICreateForm> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { dataInput, postLoading, postError } = useAppSelector(getTransactionState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(createTransactionAsyncThunk(data));
    if (postLoading === 'succeeded') {
      dispatch(setPostModal(false));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Create Transaction
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('orderId', { required: 'Required' })}
                    error={errors.orderId ? true : false}
                    id="outlined-error-helper-text"
                    label="orderId"
                    placeholder="Enter orderId"
                    helperText={errors.orderId ? String(errors.orderId.message) : ''}
                    fullWidth
                    value={dataInput.orderId}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setOrderId(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('code', { required: 'Required' })}
                    error={errors.code ? true : false}
                    id="outlined-error-helper-text"
                    label="code"
                    placeholder="Enter code"
                    helperText={errors.code ? String(errors.code.message) : ''}
                    fullWidth
                    value={dataInput.code}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setCode(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  {postLoading === 'failed' ? (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">{postError}</Alert>
                    </Stack>
                  ) : (
                    <React.Fragment />
                  )}
                  <Container style={{ display: 'flex', justifyContent: 'center' }}>
                    {postLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button variant="contained" style={{ padding: '1rem 3rem', marginTop: '1rem' }} type="submit">
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

export default CreateForm;
