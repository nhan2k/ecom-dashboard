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
import { setSessionId, setToken, createOrderAsyncThunk, getOrderState } from '@/features/redux/slices/order';

const theme = createTheme();
type Inputs = {
  sessionId: string;
  token: string;
};

interface ICreateForm {
  handleCloseModalCreate: any;
}
const CreateForm: React.FC<ICreateForm> = ({ handleCloseModalCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const { dataInput, postLoading, postError } = useAppSelector(getOrderState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(createOrderAsyncThunk(data));
    if (postLoading === 'succeeded') {
      handleCloseModalCreate();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Create Order
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('sessionId', { required: 'Required' })}
                    error={errors.sessionId ? true : false}
                    id="outlined-error-helper-text"
                    label="sessionId"
                    placeholder="Enter sessionId"
                    helperText={errors.sessionId ? String(errors.sessionId.message) : ''}
                    fullWidth
                    value={dataInput.sessionId}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setSessionId(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('token', { required: 'Required' })}
                    error={errors.token ? true : false}
                    id="outlined-error-helper-text"
                    label="token"
                    placeholder="Enter token"
                    helperText={errors.token ? String(errors.token.message) : ''}
                    fullWidth
                    value={dataInput.token}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setToken(e.target.value))}
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