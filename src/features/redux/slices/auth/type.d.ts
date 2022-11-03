interface IDataAuth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IDataSignin {
  email: string;
  password: string;
}

interface IAuth {
  accessToken: string;
  refreshToken: string;
}
type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
interface IAuthState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  auth: boolean;
  loading: TLoading;
  token?: string;
  decoded?: any;
}

export { IDataAuth, IDataSignin, IAuth, TLoading, IAuthState };
