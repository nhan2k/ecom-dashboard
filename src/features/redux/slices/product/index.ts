import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductState, IDataProduct } from './type';
import { RootState } from '@features/redux/store';
import { getAllProduct, getOneProduct, createProduct, putProduct, deleteProduct, countProduct, getAllProductPending, putShopProduct } from './product.service';

const prefixType = 'product';
const getAllProductAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProduct();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getAllProductPendingAsyncThunk = createAsyncThunk(`${prefixType}/getAll`, async (_, thunkAPI) => {
  try {
    const dataResponse = await getAllProductPending();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const countProductAsyncThunk = createAsyncThunk(`${prefixType}/count`, async (_, thunkAPI) => {
  try {
    const dataResponse = await countProduct();
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
const getOneProductAsyncThunk = createAsyncThunk(`${prefixType}/getOne`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await getOneProduct(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const createProductAsyncThunk = createAsyncThunk(`${prefixType}/create`, async (data: any, thunkAPI) => {
  try {
    const dataResponse = await createProduct(data);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductAsyncThunk = createAsyncThunk(`${prefixType}/put`, async ({ data, id }: { data: any; id: number }, thunkAPI) => {
  try {
    const dataResponse = await putProduct(data, id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});
const putProductShopAsyncThunk = createAsyncThunk(`${prefixType}/putShop`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await putShopProduct(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const deleteProductAsyncThunk = createAsyncThunk(`${prefixType}/delete`, async (id: number, thunkAPI) => {
  try {
    const dataResponse = await deleteProduct(id);
    return dataResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState: IProductState = {
  dataInput: {},
  dataGetAll: [],
  count: 0,
  dataGetOne: {},
  getAllLoading: 'idle',
  countLoading: 'idle',
  getOneLoading: 'idle',
  postLoading: 'idle',
  putLoading: 'idle',
  deleteLoading: 'idle',
  getAllError: '',
  countError: '',
  getOneError: '',
  postError: '',
  putError: '',
  deleteError: '',
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    resetProductState: () => {
      return initialState;
    },
    setTitle: (state, action) => {
      return {
        ...state,
        dataInput: {
          ...state.dataInput,
          title: action.payload,
        },
      };
    },
    setOneProduct: (state, action) => {
      const data = state.dataGetAll.filter((e) => {
        return e.id === action.payload;
      });

      return {
        ...state,
        dataGetOne: data[0],
      };
    },
    setDataOneProduct: (state, action: PayloadAction<{ key: string; value: string | number }>) => {
      return {
        ...state,
        dataGetOne: {
          ...state.dataGetOne,
          [action.payload.key]: action.payload.value,
        },
      };
    },
    resetPostLoading: (state) => {
      return {
        ...state,
        postLoading: 'idle',
      };
    },
    resetPutLoading: (state) => {
      return {
        ...state,
        putLoading: 'idle',
      };
    },
  },

  extraReducers(builder) {
    builder.addCase(getAllProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        getAllLoading: 'pending',
      };
    });
    builder.addCase(getAllProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct[] | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getAllLoading: 'failed',
          getAllError: action.payload.message,
        };
      }

      return {
        ...state,
        getAllLoading: 'succeeded',
        dataGetAll: action.payload.data,
      };
    });
    builder.addCase(getAllProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        getAllLoading: 'failed',
        getAllError: action.payload.message,
      };
    });

    builder.addCase(countProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        countLoading: 'pending',
      };
    });
    builder.addCase(countProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          countLoading: 'failed',
          countError: action.payload.message,
        };
      }

      return {
        ...state,
        countLoading: 'succeeded',
        count: action.payload.data,
      };
    });
    builder.addCase(countProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        countLoading: 'failed',
        countError: action.payload.message,
      };
    });

    builder.addCase(getOneProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        getOneLoading: 'pending',
      };
    });
    builder.addCase(getOneProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          getOneLoading: 'failed',
          getOneError: action.payload.message,
        };
      }

      return {
        ...state,
        getOneLoading: 'succeeded',
        dataGetAll: action.payload.data,
      };
    });
    builder.addCase(getOneProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        getOneLoading: 'failed',
        getOneError: action.payload.message,
      };
    });

    builder.addCase(createProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        postLoading: 'pending',
      };
    });
    builder.addCase(createProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        console.log(action.payload.message);
        return {
          ...state,
          postLoading: 'failed',
          postError: action.payload.message,
        };
      }

      return {
        ...state,
        postLoading: 'succeeded',
        dataGetAll: [...state.dataGetAll, action.payload.data],
      };
    });
    builder.addCase(createProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        postLoading: 'failed',
        postError: action.payload.message,
      };
    });

    builder.addCase(putProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          putLoading: 'failed',
          putError: action.payload.message,
        };
      }
      let id = action.payload.data.id;

      return {
        ...state,
        putLoading: 'succeeded',
        dataGetAll: state.dataGetAll.map((element: IDataProduct) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.message,
      };
    });

    builder.addCase(deleteProductAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        deleteLoading: 'pending',
      };
    });
    builder.addCase(deleteProductAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          deleteLoading: 'failed',
          deleteError: action.payload.message,
        };
      }

      let id = action.payload.data.id;
      return {
        ...state,
        deleteLoading: 'succeeded',
        dataGetAll: state.dataGetAll.filter((element: IDataProduct) => {
          return Number(element.id) !== Number(id);
        }),
      };
    });
    builder.addCase(deleteProductAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        deleteLoading: 'failed',
        deleteError: action.payload.message,
      };
    });

    builder.addCase(putProductShopAsyncThunk.pending, (state: IProductState) => {
      return {
        ...state,
        putLoading: 'pending',
      };
    });
    builder.addCase(putProductShopAsyncThunk.fulfilled, (state: IProductState, action: PayloadAction<IDataProduct | any>) => {
      if (!action.payload.isSuccess) {
        return {
          ...state,
          putLoading: 'failed',
          putError: action.payload.message,
        };
      }
      let id = action.payload.data.id;

      return {
        ...state,
        putLoading: 'succeeded',
        dataGetAll: state.dataGetAll.map((element: IDataProduct) => (element.id === id ? action.payload.data : element)),
      };
    });
    builder.addCase(putProductShopAsyncThunk.rejected, (state: IProductState, action: PayloadAction<any>) => {
      return {
        ...state,
        putLoading: 'failed',
        putError: action.payload.message,
      };
    });
  },
});

export { getAllProductAsyncThunk, getOneProductAsyncThunk, createProductAsyncThunk, putProductAsyncThunk, deleteProductAsyncThunk, countProductAsyncThunk, getAllProductPendingAsyncThunk, putProductShopAsyncThunk };
export const getProductState = (state: RootState) => state.productSlice;
export const { resetProductState, setTitle, setOneProduct, resetPostLoading, setDataOneProduct, resetPutLoading } = productSlice.actions;
export default productSlice;
