/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from './blogService';

export const getBlogs = createAsyncThunk(
  'blog/get-blogs',
  async (_, thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/create-Blogs',
  async (BlogData: any, thunkAPI) => {
    try {
      return await blogService.createBlog(BlogData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

interface BlogState {
  blogs: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBlog?: any
}

const initialState: BlogState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};


export const resetState = createAction('Reset_all');
export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload;
        state.message = 'success';
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
