/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Couponservice from './couponService';


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
  async (couponData: any, thunkAPI) => {
    try {
      return await Couponservice.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  );

  interface CouponState {
    coupons: [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string;
    createdCoupon?: any
  
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
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
