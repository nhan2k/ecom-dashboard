import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Button, Grid, Stack, TextField } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getCategoryState, putCategoryAsyncThunk, setDataInputById, setDataInput } from '@/features/redux/slices/category';
import { IDataCategory } from '@features/redux/slices/category/type';

const theme = createTheme();

interface IUpdateForm {
  id: number;
  handleCloseModalUpdate: any;
}
const UpdateForm: React.FC<IUpdateForm> = ({ id, handleCloseModalUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataCategory>();

  const { dataInput, putLoading, putError, getAllLoading, dataGetAll } = useAppSelector(getCategoryState);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setDataInputById(id));
  }, []);

  const handleOnchange = (e: React.BaseSyntheticEvent) => {
    const value = e.target.value;

    dispatch(
      setDataInput({
        name: e.target.name,
        value: value,
      })
    );
  };

  const onSubmit: SubmitHandler<IDataCategory> = async (data) => {
    data = { ...dataInput };
    await dispatch(putCategoryAsyncThunk({ data, id }));
    if (putLoading === 'succeeded') {
      handleCloseModalUpdate();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Update Category
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('title', { required: 'Required' })}
                    onChange={handleOnchange}
                    value={dataInput.title}
                    error={errors.title ? true : false}
                    id="outlined-error-helper-text"
                    label="Title"
                    placeholder="Enter Title"
                    helperText={errors.title ? String(errors.title.message) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('metaTitle')}
                    value={dataInput.metaTitle}
                    onChange={handleOnchange}
                    error={errors.metaTitle ? true : false}
                    id="outlined-error-helper-text"
                    label="Meta Title"
                    placeholder="Enter Meta Title"
                    helperText={errors.title ? String(errors.title.message) : ''}
                    fullWidth
                  />
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
