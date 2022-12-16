import * as React from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Alert, Autocomplete, Box, Button, CircularProgress, FormControl, Input, InputAdornment, InputLabel, Stack } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/features/hooks/reduxHooks';
import { createProductAsyncThunk, getProductState, resetPostLoading } from '@/features/redux/slices/product';
import { IDataProduct } from '@features/redux/slices/product/type';
import { getCategoryState } from '@/features/redux/slices/category';
import CreatableSelect from 'react-select/creatable';
import { keys, contents } from './attribute';

const theme = createTheme();
const imageMimeType = /image\/(png|jpg|jpeg)/i;

interface ICreateForm {
  handleCloseModalCreate: any;
}
const CreateForm: React.FC<ICreateForm> = ({ handleCloseModalCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataProduct>();

  const { postLoading, postError } = useAppSelector(getProductState);
  const categoryState = useAppSelector(getCategoryState);

  const dispatch = useAppDispatch();
  const [image, setImage] = React.useState(null);

  if (postLoading === 'succeeded') {
    handleCloseModalCreate();
    dispatch(resetPostLoading());
  }

  const [file, setFile] = React.useState(null);
  const [fileDataURL, setFileDataURL] = React.useState(null);

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

  const optionsCategory =
    categoryState.getAllLoading === 'succeeded'
      ? categoryState.dataGetAll.map((e: any) => {
          return {
            label: e.title,
            value: e.id,
          };
        })
      : [];

  const [cat, setCat] = React.useState(optionsCategory[0].value);

  const [attributes1, setattributes1] = React.useState<string | undefined>();
  const [attributes2, setattributes2] = React.useState<string | undefined>();
  const [attributes3, setattributes3] = React.useState<string | undefined>();

  const [value1, setvalue1] = React.useState<any[]>([]);
  const [value2, setvalue2] = React.useState<any[]>([]);
  const [value3, setvalue3] = React.useState<any[]>([]);

  const onSubmit: SubmitHandler<IDataProduct> = async (data) => {
    data.image = image;
    data.category = cat;
    data.meta = [
      {
        key: String(attributes1),
        content: value1.map((e) => e.value).join(','),
      },
      {
        key: String(attributes2),
        content: value2.map((e) => e.value).join(','),
      },
      {
        key: String(attributes3),
        content: value3.map((e) => e.value).join(','),
      },
    ].filter((e: any) => e.key !== 'undefined' && e.content !== '');

    await dispatch(createProductAsyncThunk(data));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h3" align="center" style={{ marginBottom: '30px' }}>
            Create Product
          </Typography>
          <React.Fragment>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="standard"
                    {...register('title', { required: 'Required' })}
                    error={errors.title ? true : false}
                    inputProps={{ style: { fontSize: '1.6rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.6rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '1.6rem' } }}
                    id=" outlined-error-helper-text"
                    label="Product Name"
                    placeholder="Enter Title"
                    helperText={errors.title ? String(errors.title.message) : ''}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant="standard"
                    {...register('quantity', {
                      min: 0,
                    })}
                    defaultValue="0"
                    type="number"
                    id="outlined-error-helper-text"
                    label="Product Quantity"
                    error={errors.quantity ? true : false}
                    helperText={errors.quantity ? 'Min quantity is 0' : ''}
                    fullWidth
                    inputProps={{ style: { fontSize: '1.6rem' } }}
                    InputLabelProps={{ style: { fontSize: '1.6rem' } }}
                    FormHelperTextProps={{ style: { fontSize: '1.6rem' } }}
                  />
                </Grid>

                <Grid item xs={6} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-product-price">Product Price</InputLabel>
                    <Input {...register('price', { min: 0 })} id="standard-adornment-amount" type="number" startAdornment={<InputAdornment position="start">$</InputAdornment>} error={errors.price ? true : false} fullWidth inputProps={{ style: { fontSize: '1.6rem' } }} defaultValue="0" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Autocomplete disablePortal id="combo-box-demo" options={optionsCategory} defaultValue={optionsCategory[0]} onChange={(e, value) => setCat(value.value)} renderInput={(params) => <TextField {...params} variant="standard" label="Category" />} fullWidth />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Attribute</p>
                  <CreatableSelect isClearable options={keys} name="key" onChange={(opts) => setattributes1(opts?.value)} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Value</p>
                  <CreatableSelect isClearable options={contents[String(attributes1)]} isMulti name="content" className="basic-multi-select" classNamePrefix="select" onChange={(opts) => setvalue1([...opts])} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Attribute</p>
                  <CreatableSelect isClearable options={keys.filter((e) => e.value !== attributes1)} name="key" onChange={(opts) => setattributes2(opts?.value)} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Value</p>
                  <CreatableSelect isClearable options={contents[String(attributes2)]} isMulti name="content" className="basic-multi-select" classNamePrefix="select" onChange={(opts) => setvalue2([...opts])} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Attribute</p>
                  <CreatableSelect isClearable options={keys.filter((e) => e.value !== attributes1 && e.value !== attributes2)} name="key" onChange={(opts) => setattributes3(opts?.value)} />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <p>Value</p>
                  <CreatableSelect isClearable options={contents[String(attributes3)]} isMulti name="content" className="basic-multi-select" classNamePrefix="select" onChange={(opts) => setvalue3([...opts])} />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Stack direction="row" alignItems="flex-end" justifyContent="center" spacing={2}>
                    <Typography variant="h4">Choose Product Image</Typography>
                    <Button variant="contained" component="label" size="large">
                      Upload
                      <input hidden accept=".png, .jpg, .jpeg" multiple type="file" {...register('image')} onChange={changeHandler} />
                    </Button>
                  </Stack>
                  {fileDataURL ? <p style={{ display: 'flex', justifyContent: 'center' }}>{<img src={fileDataURL} alt="preview" style={{ maxWidth: '10rem' }} />}</p> : null}
                </Grid>
                <Grid item xs={12}>
                  {postLoading === 'failed' ? (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
                        {postError}
                      </Alert>
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
