/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productServcie';



export interface productState {
  products: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  product?: any
  addToWishlist?: any
}


const initialState: productState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const getproducts = createAsyncThunk(
  'product/get-products',
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getproduct = createAsyncThunk(
  'product/get-products',
  async (id: string, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addToWishList = createAsyncThunk(
  'product/wishlist',
  async (id: string, thunkAPI) => {
    try {
      return await productService.addToWishList(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getproducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.message = 'success';
      })
      .addCase(getproducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
        state.message = 'success';
      })
      .addCase(getproduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addToWishlist = action.payload;
        state.message = 'Product Added To Wishlist';
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
