import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Autocomplete, Button, FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, Stack, TextField } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { getProductState, putProductAsyncThunk, resetPutLoading, setDataOneProduct } from '@/features/redux/slices/product';
import { IDataProduct } from '@features/redux/slices/product/type';

const theme = createTheme();

const imageMimeType = /image\/(png|jpg|jpeg)/i;

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

  const { putLoading, putError, dataGetOne } = useAppSelector(getProductState);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IDataProduct> = async (data) => {
    const { title, quantity, metaTitle, price, shop } = dataGetOne;
    let newData = { title, quantity, metaTitle, image, price, shop };
    await dispatch(putProductAsyncThunk({ data: newData, id }));

    return handleCloseModalUpdate();
  };
  const [image, setImage] = React.useState(dataGetOne.image);

  const options = [
    {
      label: 'Available',
      value: 1,
    },
    {
      label: 'Non-Available',
      value: 0,
    },
  ];

  if (putLoading === 'succeeded') {
    handleCloseModalUpdate();
    dispatch(resetPutLoading());
  }

  const [file, setFile] = React.useState(null);
  const [fileDataURL, setFileDataURL] = React.useState(`${process.env.REACT_APP_API_PUBLIC_IMG}/${dataGetOne.image}`);

  const changeHandler = (e: React.BaseSyntheticEvent) => {
    setImage(e.target.files);
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid');
      return;
    }
    setFile(file);
  };
  React.useEffect(() => {
    let fileReader: FileReader,
      isCancel: boolean = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleOnchange = (e: React.BaseSyntheticEvent) => {
    dispatch(setDataOneProduct({ key: e.target.name, value: e.target.value }));
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('title', { required: 'Required' })}
                    inputProps={{ style: { fontSize: '1.6rem', lineHeight: '2rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.6rem', lineHeight: '2rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '1.6rem', lineHeight: '2rem' } }}
                    multiline
                    value={dataGetOne.title}
                    onChange={handleOnchange}
                    error={errors.title ? true : false}
                    id="outlined-error-helper-text"
                    label="Title "
                    placeholder="Enter Title"
                    helperText={errors.title ? String(errors.title.message) : ''}
                    variant="standard"
                    fullWidth
                  />
                </Grid>

                {/* <Grid item xs={6} sm={6}>
                  <Autocomplete disablePortal id="combo-box-demo" {...register('shop')} options={options} onChange={(e, data) => data} value={options.filter((e) => e.value === dataGetOne.shop)[0]} renderInput={(params) => <TextField {...params} variant="standard" label="Publicly" />} fullWidth />
                </Grid> */}
                <Grid item xs={6} sm={6}>
                  <TextField
                    {...register('quantity', {
                      min: 0,
                    })}
                    type="number"
                    variant="standard"
                    value={dataGetOne.quantity}
                    onChange={handleOnchange}
                    error={errors.quantity ? true : false}
                    id="outlined-error-helper-text"
                    label="Quantity"
                    placeholder="Enter Quantity"
                    fullWidth
                    inputProps={{ style: { fontSize: '1.6rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.6rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '1.6rem' } }}
                    helperText={errors.quantity ? String(errors.quantity.message) : ''}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-product-price">Product Price</InputLabel>
                    <OutlinedInput
                      {...register('price')}
                      inputProps={{ style: { fontSize: '1.6rem' } }}
                      id="outlined-adornment-product-price"
                      value={dataGetOne.price || ''}
                      onChange={handleOnchange}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Product Price"
                      error={errors.title ? true : false}
                      fullWidth
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    {...register('metaTitle')}
                    value={dataGetOne.metaTitle || ''}
                    onChange={handleOnchange}
                    error={errors.metaTitle ? true : false}
                    variant="standard"
                    inputProps={{ style: { fontSize: '1.6rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.6rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '1.6rem' } }}
                    id="outlined-error-helper-text"
                    label="Meta Data "
                    placeholder="Enter Meta Data"
                    helperText={errors.metaTitle ? String(errors.metaTitle.message) : ''}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography variant="h4">Choose Image</Typography>
                    <Button variant="contained" component="label" size="large">
                      Upload
                      <input hidden accept=".png, .jpg, .jpeg" multiple type="file" {...register('image')} onChange={changeHandler} />
                    </Button>
                  </Stack>
                  {fileDataURL ? <p style={{ display: 'flex', justifyContent: 'center' }}>{<img src={fileDataURL} alt="preview" style={{ maxWidth: '20rem' }} />}</p> : null}
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
