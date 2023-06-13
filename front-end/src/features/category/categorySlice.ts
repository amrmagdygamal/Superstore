/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryService from './categoryService';



export interface categoryState {
  categorys: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  category?: any
}


const initialState: categoryState = {
  categorys: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const getCategories = createAsyncThunk(
  'category/get-categories',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  'category/get-category',
  async (id: string, thunkAPI) => {
    try {
      return await categoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const categorySlice = createSlice({
  name: 'categorys',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categorys = action.payload;
        state.message = 'success';
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.category = action.payload;
        state.message = 'success';
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default categorySlice.reducer;
