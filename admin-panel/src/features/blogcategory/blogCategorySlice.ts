/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogCategoryService from './blogCategoryService';

export const getBlogCategories = createAsyncThunk(
  'blogcategory/get-blogcategories',
  async (_, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogCategories();
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


export const getBlogcateg = createAsyncThunk(
  'blogcategory/get-blogcategory',
  async (_id: string, thunkAPI) => {
    try {
      return await blogCategoryService.getBlogcategory(_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlogcateg = createAsyncThunk(
  'blogcategory/update-blogcategory',
  async (blogcateg: BlogcategInfo, thunkAPI) => {
    try {
      return await blogCategoryService.updateBlogcategory(blogcateg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlogcateg = createAsyncThunk(
  'blogcategory/delete-blogcategory',
  async (id: string, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export interface BlogcategInfo  {
  _id?: string
  title: string
} 

interface BlogCategorieState {
  blogCategories: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBlogCategory?: BlogcategInfo;
  blogcategName?: string
  updatedBlogcateg?: BlogcategInfo
  deletedBlogcateg?: BlogcategInfo
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
      .addCase(getBlogcateg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogcateg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogcategName = action.payload.title;
      })
      .addCase(getBlogcateg.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(updateBlogcateg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogcateg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogcateg = action.payload;
      })
      .addCase(updateBlogcateg.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(deleteBlogcateg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogcateg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlogcateg = action.payload;
      })
      .addCase(deleteBlogcateg.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCategorieSlice.reducer;
