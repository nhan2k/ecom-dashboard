import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getCartState, setSessionId, setToken, createCartAsyncThunk } from '@/features/redux/slices/cart';

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

  const { dataInput, postLoading } = useAppSelector(getCartState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dispatch(createCartAsyncThunk(data));
    if (postLoading === 'succeeded') {
      handleCloseModalCreate();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Create Cart
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('sessionId', { required: 'Required' })}
                    error={errors.sessionId ? true : false}
                    id="outlined-error-helper-text"
                    label="Session Id"
                    placeholder="Enter Session Id"
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
                    label="Token"
                    placeholder="Enter Token"
                    helperText={errors.token ? String(errors.token.message) : ''}
                    fullWidth
                    value={dataInput.token}
                    onChange={(e: React.BaseSyntheticEvent) => dispatch(setToken(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Container style={{ display: 'flex', justifyContent: 'center', fontSize: '1.6rem' }}>
                    {postLoading === 'pending' ? (
                      <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <Button variant="contained" style={{ padding: '1rem 3rem' }} type="submit">
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
