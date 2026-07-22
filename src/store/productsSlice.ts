import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IProduct, ICreateProductPayLoad } from '../components/Api/ApiModels';
import { ProductApi } from '../components/Api/ProductsApi';
import { toast } from 'react-toastify';

interface ProductsState {
  items: IProduct[];
  currentProduct: IProduct | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await ProductApi.getProducts();
    return response.data;
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id: string) => {
    return await ProductApi.getProductById(id);
  },
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (payload: ICreateProductPayLoad) => {
    const product = await ProductApi.createProduct(payload);
    toast.success('Вещь успешно добавлена');
    return product;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string) => {
    await ProductApi.deleteProduct(id);
    toast.success('Вещь удалена');
    return id;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state: ProductsState) => {
      state.currentProduct = null;
    },
    clearError: (state: ProductsState) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
        toast.error('Не удалось загрузить список вещей');
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
        toast.error('Не удалось загрузить вещь');
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addProduct.rejected, (_, action) => {
        toast.error(action.error.message || 'Ошибка при добавлении')
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
        state.currentProduct = null;
      })
      .addCase(deleteProduct.rejected, (_, action) => {
        toast.error(action.error.message || 'Ошибка при удалении')
      })
  }
})

export const { clearCurrentProduct, clearError } = productsSlice.actions;
export default productsSlice.reducer;