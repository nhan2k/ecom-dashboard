import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

interface ISignUpInProps {
  children: JSX.Element
}

const SignUpIn: React.FunctionComponent<ISignUpInProps> = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box>{children}</Box>
      </Container>
    </React.Fragment>
  )
}

export default SignUpIn
