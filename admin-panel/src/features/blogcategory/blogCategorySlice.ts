/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';

export const getBlogCategories = createAsyncThunk(
  'blogcategory/get-blogcategories',
  async (_, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlogCategory = createAsyncThunk(
  'blogcategory/create-blogcategory',
  async (BlogCategoryData: any, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogCategory(BlogCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface BlogCategorieState {
  blogCategories: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBlogCategory?: any;
}

export const resetState = createAction('Reset_all');

const initialState: BlogCategorieState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const blogCategorieSlice = createSlice({
  name: 'blogCategories',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogCategories = action.payload;
        state.message = 'success';
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdBlogCategory = action.payload;
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorieSlice.reducer;
