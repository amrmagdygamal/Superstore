/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from './blogService';



export interface blogState {
  blogs: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  blog?: any
}


const initialState: blogState = {
  blogs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



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
export const getBlog = createAsyncThunk(
  'blog/get-blog',
  async (id: string, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


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
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blog = action.payload;
        state.message = 'success';
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
