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
  quantity?: number;
  content?: FileList;
  publishedAt?: Date;
  startsAt?: Date;
  endsAt?: Date;
  slug?: string;
  sku?: string;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface IProductState {
  dataInput: IDataProduct;
  dataGetAll: IDataProduct[];
  count: number;
  dataGetOne: IDataProduct;
  getAllLoading: TLoading;
  countLoading: TLoading;
  getOneLoading: TLoading;
  postLoading: TLoading;
  putLoading: TLoading;
  deleteLoading: TLoading;
  getAllError: string;
  countError: string;
  getOneError: string;
  postError: string;
  putError: string;
  deleteError: string;
}

export { IDataProduct, IDataSignin, IAuth, TLoading, IProductState };
