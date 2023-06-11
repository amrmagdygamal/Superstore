/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import BrandService from './brandService';

export const getBrands = createAsyncThunk(
  'brand/get-brands',
  async (_, thunkAPI) => {
    try {
      return await BrandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const createBrand = createAsyncThunk(
  'brand/create-brands',
  async (brandData: any, thunkAPI) => {
    try {
      return await BrandService.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface BrandInfo  {
  title: string
} 

interface BrandState {
  brands: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBrand?: BrandInfo

}

export const resetState = createAction("Reset_all");
const initialState: BrandState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        state.message = 'success';
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
