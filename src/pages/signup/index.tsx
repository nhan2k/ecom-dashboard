import * as React from 'react'

import Box from '@mui/material/Box'
import { FormControl, InputLabel, OutlinedInput } from '@mui/material'

interface ISignup {}
const Signup: React.FunctionComponent<ISignup> = () => {
  const [name, setName] = React.useState('Composed TextField')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        width: '55ch',
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>
    </Box>
  )
}

export default Signup
