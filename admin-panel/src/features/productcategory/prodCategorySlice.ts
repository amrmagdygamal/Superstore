/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProdCategoryService from './prodCategoryService';

const initialState = {
  prodCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getprodCategories = createAsyncThunk(
  'brand/get-prodCategories',
  async (_, thunkAPI) => {
    try {
      return await ProdCategoryService.getProdCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const prodCategorieSlice = createSlice({
  name: 'prodCategories',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getprodCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getprodCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.prodCategories = action.payload;
        state.message = 'success';
      })
      .addCase(getprodCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      });
  },
});

export default prodCategorieSlice.reducer;
