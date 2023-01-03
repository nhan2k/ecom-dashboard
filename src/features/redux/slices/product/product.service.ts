import { privateHTTP, IDataResponse } from '@features/utils/axios';
import { getItem } from '@features/utils/local.storage';
import { IDataProduct } from './type';
import { shop } from './enum';

const getAllProduct = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/product/admin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
const getAllProductPending = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/product/una', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
const countProduct = async (): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get('/product/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const getOneProduct = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const createProduct = async (data: any): Promise<IDataResponse | any> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const formData = new FormData();
    const { title, image, quantity, price, category, meta } = data;
    formData.append('title', title);
    if (meta.length > 0) {
      formData.append('meta', JSON.stringify(meta));
    }
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('category', category);

    if (image?.length > 0) {
      formData.append('image', image[0], image[0].name);
    }
    const response = await privateHTTP.post('/product', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data.data;
  }
};

const putProduct = async (data: any, id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const formData = new FormData();
    const { title, image, quantity, price, metaTitle, shop } = data;
    if (title) {
      formData.append('title', title);
    }
    if (quantity) {
      formData.append('quantity', quantity);
    }
    if (price) {
      formData.append('price', price);
    }
    if (metaTitle) {
      formData.append('metaTitle', metaTitle);
    }

    formData.append('shop', shop);

    if (image?.length > 0) {
      formData.append('image', image[0], image[0].name);
    }

    const response = await privateHTTP.put(`/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const putShopProduct = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';

    const response = await privateHTTP.put(
      `/product/shop/${id}`,
      { shop: shop.available },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteProduct = async (id: number): Promise<IDataResponse> => {
  try {
    const user = getItem('user');
    const token = user !== null ? user.accessToken : '';
    const response = await privateHTTP.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getAllProduct, getOneProduct, createProduct, putProduct, deleteProduct, countProduct, getAllProductPending, putShopProduct };
