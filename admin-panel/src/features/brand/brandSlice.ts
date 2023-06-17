/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import BrandService from './brandService';
import { toast } from 'react-toastify';

export const getBrands = createAsyncThunk(
  'brand/get-brands',
  async (_, thunkAPI) => {
    try {
      return await BrandService.getBrands();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBrand = createAsyncThunk(
  'brand/get-brand',
  async (id: string, thunkAPI) => {
    try {
      return await BrandService.getBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const createBrand = createAsyncThunk(
  'brand/create-brand',
  async (brandData: BrandInfo, thunkAPI) => {
    try {
      return await BrandService.createBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const updateBrand = createAsyncThunk(
  'brand/update-brand',
  async (brandData: BrandInfo, thunkAPI) => {
    try {
      return await BrandService.updateBrand(brandData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBrand = createAsyncThunk(
  'brand/delete-brand',
  async (id: string, thunkAPI) => {
    try {
      return await BrandService.deleteBrand(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface BrandInfo  {
  _id?: string,
  title: string
} 

interface BrandState {
  brands: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdBrand?: BrandInfo
  brandName?: string
  updatedBrand?: BrandInfo
  deletedBrand?: BrandInfo

}

export const resetState = createAction("Reset_all");
const initialState: BrandState = {
  brands: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
        state.message = 'success';
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brandName = action.payload?.title;
        
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload;
        if (state.isSuccess === true) {
          toast.success('Brand Added Successfullly!');
        }
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload;
        if (state.isSuccess === true) {
          toast.success('Brand Updated Successfullly!');
        }
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
        if (state.isSuccess === true) {
          toast.success('Brand Deleted Successfullly!');
        }
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(resetState, () => initialState)
  },
});

export default brandSlice.reducer;
