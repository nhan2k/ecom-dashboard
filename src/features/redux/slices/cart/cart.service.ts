import { privateHTTP, publicHTTP, IDataResponse } from '@features/utils/axios';

const getAllCart = async (): Promise<IDataResponse> => {
  try {
    const response = await privateHTTP.get('/cart');
    console.log('🚀 ~ file: cart.service.ts ~ line 6 ~ getAllCart ~ response', response);
    return response.data;
  } catch (error: any) {
    console.log('🚀 ~ file: cart.service.ts ~ line 9 ~ getAllCart ~ error', error);
    return error.response.data;
  }
};

export { getAllCart };
