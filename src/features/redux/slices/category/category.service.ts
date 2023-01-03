import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataCategory } from './type';

const getAllCategory = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/category', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneCategory = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createCategory = async (data: IDataCategory): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const formData = new FormData();
    const { title, parentId, image } = data;

    formData.append('title', String(title));
    if (image && image.length > 0) {
      formData.append('image', image[0], image[0].name);
    }
    if (parentId) {
      formData.append('parentId', String(parentId));
    }
    const response = await privateHTTP.post('/category', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putCategory = async (data: IDataCategory, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const formData = new FormData();
    const { title, image } = data;
    console.log('🚀 ~ file: category.service.ts:66 ~ putCategory ~ image', image);
    formData.append('title', String(title));
    if (image && image.length > 0) {
      formData.append('image', image[0], image[0].name);
    }
    const response = await privateHTTP.put(`/category/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteCategory = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.delete(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllCategory, getOneCategory, createCategory, putCategory, deleteCategory };
