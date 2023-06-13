/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';



export interface blogCategoryState {
  blogCategories: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  blogCategory?: any
}


const initialState: blogCategoryState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const getblogCategories = createAsyncThunk(
  'blogCategory/get-blogCategorys',
  async (_, thunkAPI) => {
    try {
      return await blogCategoryService.getblogCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getblogCategory = createAsyncThunk(
  'blogCategory/get-blogCategory',
  async (id: string, thunkAPI) => {
    try {
      return await blogCategoryService.getblogCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const blogCategorySlice = createSlice({
  name: 'blogCategorys',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getblogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogCategories = action.payload;
        state.message = 'success';
      })
      .addCase(getblogCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getblogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getblogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogCategory = action.payload;
        state.message = 'success';
      })
      .addCase(getblogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorySlice.reducer;
