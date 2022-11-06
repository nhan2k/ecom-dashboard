import { privateHTTP, publicHTTP } from '@features/utils/axios';
import { IDataAuth, IDataSignin, IAuth } from './type';
import { IDataResponse } from '@features/utils/axios';

const signin = async (data: IDataSignin): Promise<IDataResponse> => {
  try {
    const response = await publicHTTP.post('/api/v1', data);
    console.log('🚀 ~ file: auth.service.ts ~ line 8 ~ signin ~ response', response);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const signout = async (): Promise<IDataResponse> => {
  try {
    const response = await privateHTTP.get('/auth/logout');
    console.log('🚀 ~ file: auth.service.ts ~ line 8 ~ signin ~ response', response);
    return response.data;
  } catch (error: any) {
    console.log('🚀 ~ file: auth.service.ts ~ line 21 ~ signout ~ error', error);
    return error.response.data;
  }
};
export { signin, signout };
