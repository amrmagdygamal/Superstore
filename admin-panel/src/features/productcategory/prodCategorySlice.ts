/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProdCategoryService from './prodCategoryService';
import prodCategoryService from './prodCategoryService';

export const getprodCategories = createAsyncThunk(
  'prodCategory/get-prodCategories',
  async (_, thunkAPI) => {
    try {
      return await ProdCategoryService.getProdCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProdCategory = createAsyncThunk(
  'prodcategory/create-prodcategory',
  async (prodCategoryData: any, thunkAPI) => {
    try {
      return await prodCategoryService.createCategory(prodCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface ProdCategorieState {
  prodCategories: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdProdCategory?: any;
}

const initialState: ProdCategorieState = {
  prodCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');
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
      })
      .addCase(createProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdProdCategory = action.payload;
      })
      .addCase(createProdCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default prodCategorieSlice.reducer;
