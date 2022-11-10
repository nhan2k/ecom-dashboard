interface IDataProduct {
  id?: number;
  userId?: number;
  title?: string;
  metaTitle?: string;
  summary?: JSON;
  type?: number;
  price?: number;
  discount?: number;
  shop?: number;
  content?: JSON;
  publishedAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  slug?: string;
  sku?: string;
}

interface IDataInput {
  title: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductState {
  dataInput: IDataInput;
  dataGetAll: IDataProduct[];
  dataGetOne: IDataProduct;
  getAllLoading: TLoading;
  getOneLoading: TLoading;
  postLoading: TLoading;
  putLoading: TLoading;
  deleteLoading: TLoading;
  getAllError: string;
  getOneError: string;
  postError: string;
  putError: string;
  deleteError: string;
}

export { IDataProduct, IDataSignin, IAuth, TLoading, IProductState };
