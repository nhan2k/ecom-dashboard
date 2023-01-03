interface IDataCategory {
  id?: string;
  parentId?: number;
  title?: string;
  metaTitle?: string;
  slug?: string;
  image?: FileList;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';

interface ICategoryState {
  dataInput: IDataCategory;
  dataGetAll: IDataCategory[];
  dataGetOne: IDataCategory;
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
  postModal: boolean;
  putModal: boolean;
  deleteModal: boolean;
}

export { IDataCategory, IDataSignin, IAuth, TLoading, ICategoryState };
