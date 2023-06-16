import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productServcie';
import { toast } from 'react-toastify';

export interface productState {
  products: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  product?: any;
  addToWishlist?: any;
  rateProd?: any
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
  async (data: any, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getproduct = createAsyncThunk(
  'product/get-product',
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

export const rateProduct = createAsyncThunk(
  'product/rate-product',
  async (data: any, thunkAPI) => {
    try {
      return await productService.rateProduct(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        if(state.isSuccess === true) {
          toast.info("Added to WishList successfully!")
        }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isError === true) {
          toast.error("Some thing went Wrong!!")
        }
      })
      .addCase(rateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.rateProd = action.payload;
        state.message = 'Product Added To Wishlist';
        if(state.isSuccess === true) {
          toast.info("Rating Added Successfully!")
        }
      })
      .addCase(rateProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isError === true) {
          toast.error("Some thing went Wrong!!")
        }
      })
  },
});

export default productSlice.reducer;