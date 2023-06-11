/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductService from './productService';

export const getProducts = createAsyncThunk(
  'product/get-products',
  async (_, thunkAPI) => {
    try {
      return await ProductService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create-products',
  async (productData: any, thunkAPI) => {
    try {
      return await ProductService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// interface Product {
//   name: string
//   images : []
//   brand: string
//   category: string
//   description: string
//   price: number
//   countInStock: number
//   ratings: []
// }

interface ProductState {
  products: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdProduct?: any

}

const initialState: ProductState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.message = 'success';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      });
  },
});

export default productSlice.reducer;
