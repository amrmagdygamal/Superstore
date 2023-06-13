/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import brandService from './brandService';



export interface brandState {
  brands: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  brand?: any
}


const initialState: brandState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const getBrands = createAsyncThunk(
  'brand/get-brands',
  async (_, thunkAPI) => {
    try {
      return await brandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getBrand = createAsyncThunk(
  'brand/get-brand',
  async (id: string, thunkAPI) => {
    try {
      return await brandService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


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
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brand = action.payload;
        state.message = 'success';
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
