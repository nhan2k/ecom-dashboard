import * as React from 'react'

import { SignUpIn } from '@/features/layout'
import SignUp from '@features/templates/sign-up'

interface ISignup {}
const Signup: React.FunctionComponent<ISignup> = () => {
  return (
    <SignUpIn>
      <SignUp />
    </SignUpIn>
  )
}

export default Signup
