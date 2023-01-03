import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Autocomplete, Box, Button, CircularProgress, Stack } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { createCategoryAsyncThunk, getCategoryState } from '@/features/redux/slices/category';
import { IDataCategory } from '@features/redux/slices/category/type';

const theme = createTheme();

interface ICreateForm {
  handleCloseModalCreate: any;
}
const CreateForm: React.FC<ICreateForm> = ({ handleCloseModalCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataCategory>();

  const { postLoading, postError, dataGetAll, getAllLoading } = useAppSelector(getCategoryState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IDataCategory> = async (data) => {
    await dispatch(createCategoryAsyncThunk(data));
  };

  const options =
    getAllLoading === 'succeeded'
      ? dataGetAll.map((element: any) => {
          return {
            label: element.title,
            id: element.id,
          };
        })
      : [];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Create Category
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <TextField {...register('title', { required: 'Required' })} error={errors.title ? true : false} id="outlined-error-helper-text" label="Title" placeholder="Enter Title" helperText={errors.title ? String(errors.title.message) : ''} fullWidth />
                </Grid>
                {/* <Grid item xs={6} sm={6}>
                  <Autocomplete {...register('parentId')} disablePortal options={options} renderInput={(params) => <TextField {...params} label="Parent Title" fullWidth />} fullWidth />
                </Grid> */}
                {/* <Grid item xs={12} sm={12}>
                  <TextField {...register('metaTitle', { required: 'Required' })} error={errors.metaTitle ? true : false} id="outlined-error-helper-text" label="Meta Title" placeholder="Enter Meta Title" helperText={errors.title ? String(errors.title.message) : ''} fullWidth />
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography variant="h4">Choose Image</Typography>
                    <Button variant="contained" component="label" size="large">
                      Upload
                      <input hidden accept="image/*" multiple type="file" {...register('image')} />
                    </Button>
                  </Stack>
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
                      <Button variant="contained" style={{ padding: '1rem 3rem', margin: '0 1rem' }} type="submit">
                        <Typography variant="h5">Submit</Typography>
                      </Button>
                    )}
                    <Button variant="contained" style={{ padding: '1rem 3rem', margin: '0 1rem' }} color="secondary" onClick={() => handleCloseModalCreate()}>
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

export default CreateForm;
