interface IDataAuth {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface IDataSignin {
  email: string
  password: string
}

export { IDataAuth, IDataSignin }
