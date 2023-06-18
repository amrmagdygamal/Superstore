/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Couponservice from './couponService';
import couponService from './couponService';
import { toast } from 'react-toastify';

export const getCoupons = createAsyncThunk(
  'coupon/get-coupons',
  async (_, thunkAPI) => {
    try {
      return await Couponservice.getCoupons();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  'coupon/create-coupon',
  async (couponData: CouponInfo, thunkAPI) => {
    try {
      return await Couponservice.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCoupon = createAsyncThunk(
  'coupon/get-coupon',
  async (_id: string, thunkAPI) => {
    try {
      return await couponService.getCoupon(_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  'coupon/update-coupon',
  async (coupon: CouponInfo, thunkAPI) => {
    try {
      return await couponService.updateCoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  'coupon/delete-coupon',
  async (id: string, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface CouponInfo {
  _id?: string;
  name: string;
  expiry: Date;
  discount: number;
}

interface CouponState {
  coupons: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdCoupon?: CouponInfo;
  updatedCoupon?: CouponInfo;
  deletedCoupon?: CouponInfo;
  couponName?: string;
  couponDiscount?: number;
  couponExpiry?: Date;
}

const initialState: CouponState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');
export const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.coupons = action.payload;
        state.message = 'success';
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCoupon = action.payload;
        if (state.isSuccess === true) {
          toast.success('Coupon Added Successfullly!');
        }
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponName = action.payload.name;
        state.couponDiscount = action.payload.discount;
        state.couponExpiry = action.payload.expiry;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
        if (state.isSuccess === true) {
          toast.success('Coupon Updated Successfullly!');
        }
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload;
        if (state.isSuccess === true) {
          toast.success('Coupon Deleted Successfullly!');
        }
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
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

export default couponSlice.reducer;
