/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProdCategoryService from './prodCategoryService';
import prodCategoryService from './prodCategoryService';
import { toast } from 'react-toastify';

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
  async (prodCategoryData: CategoryInfo, thunkAPI) => {
    try {
      return await prodCategoryService.createCategory(prodCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCategory = createAsyncThunk(
  'category/get-category',
  async (id: string, thunkAPI) => {
    try {
      return await ProdCategoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const updateCategory = createAsyncThunk(
  'category/update-category',
  async (category: CategoryInfo, thunkAPI) => {
    try {
      return await ProdCategoryService.updateCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete-category',
  async (id: string, thunkAPI) => {
    try {
      return await ProdCategoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export interface CategoryInfo  {
  _id?: string
  title: string
} 



interface ProdCategorieState {
  prodCategories: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdProdCategory?: CategoryInfo;
  categoryName?: string
  updatedCategory?: CategoryInfo
  deletedCategory?: CategoryInfo
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
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getCategory.rejected, (state, action) => {
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
        if (state.isSuccess === true) {
          toast.success('Category Added Successfullly!');
        }
      })
      .addCase(createProdCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
        if (state.isSuccess === true) {
          toast.success('Category Updated Successfullly!');
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
        if (state.isSuccess === true) {
          toast.success('Category Deleted Successfullly!');
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default prodCategorieSlice.reducer;
