import { privateHTTP, publicHTTP } from '@features/utils/axios'
import { IDataAuth, IDataSignin, IAuth } from './type'
import { IDataResponse } from '@features/utils/axios'

const signin = async (data: IDataSignin): Promise<any> => {
  try {
    const response = await publicHTTP.post('/api/v1', data)
    return response.data
  } catch (error: any) {
    console.log('🚀 ~ file: auth.service.ts ~ line 10 ~ signin ~ error', error)
    return error.response.data
  }
}
export { signin }
