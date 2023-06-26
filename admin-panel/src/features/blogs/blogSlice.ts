/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import blogService from './blogService';
import { toast } from 'react-toastify';
import Blogservice from './blogService';

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

export const uploadImg = createAsyncThunk(
  'upload/an-image',
  async (data: any, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i]);
      }
      return await Blogservice.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blog/create-Blogs',
  async (BlogData: BlogInfo, thunkAPI) => {
    try {
      return await blogService.createBlog(BlogData);
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
export const updateBlog = createAsyncThunk(
  'blog/update-blog',
  async (blog: BlogInfo, thunkAPI) => {
    try {
      return await blogService.updateBlog(blog);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blog/delete-blog',
  async (id: string, thunkAPI) => {
    try {
      return await blogService.deleteBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface BlogInfo {
  _id?: string;
  title: string;
  description: string;
  category: string;
  author: string;
  images: any;
}

interface BlogState {
  blogs: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBlog?: BlogInfo;
  updatedBlog?: BlogInfo;
  deletedBlog?: BlogInfo;
  blogName?: string;
  blogDesc?: string;
  blogCategory?: string;
  blogAuthor?: string;
  blogImages?: any;
  images?: any;
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
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        if (state.isSuccess === true) {
          toast.success('image Uploaded successfully!');
        }
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload;
        if (state.isSuccess === true) {
          toast.success('Blog Added Successfullly!');
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogName = action.payload.title;
        state.blogDesc = action.payload.description;
        state.blogCategory = action.payload.category;
        state.blogAuthor = action.payload.author;
        state.blogImages = action.payload.images;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? 'Some Thing went wrong';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
        if (state.isSuccess === true) {
          toast.success('Blog Updated Successfullly!');
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? 'Some Thing went wrong';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload;
        if (state.isSuccess === true) {
          toast.success('Blog Deleted Successfullly!');
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? 'Some Thing went wrong';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
