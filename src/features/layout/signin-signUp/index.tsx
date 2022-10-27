import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'

interface ISignUpInProps {
  children: JSX.Element
}

const SignUpIn: React.FunctionComponent<ISignUpInProps> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={3} style={{ border: '1px solid black' }}>
            {children}
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default SignUpIn
