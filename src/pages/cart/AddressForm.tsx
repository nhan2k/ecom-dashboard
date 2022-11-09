import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Container } from '@mui/system';

export default function AddressForm() {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField error id="outlined-error-helper-text" label="Error" defaultValue="Hello World" helperText="Incorrect entry." />
        </Grid>
        <Grid item xs={12}>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained">Submit</Button>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
