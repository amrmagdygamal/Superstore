/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from './orderService';
import { User } from '../../types/User';

export const getAllOrders = createAsyncThunk(
  'order/get-orders',
  async (_, thunkAPI) => {
    try {
      return await OrderService.getAllOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrderbyuserid = createAsyncThunk(
  'order/get-order',
  async (id: string, thunkAPI) => {
    try {
      return await OrderService.getOrderbyuserid(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export type orderState = {
  orders: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  order?: any
}


export const resetState = createAction("Reset_all");

const initialState: orderState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};


export const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
        state.message = 'success';
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getOrderbyuserid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderbyuserid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        state.message = 'success';
      })
      .addCase(getOrderbyuserid.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState)
  },
});

export default OrderSlice.reducer;
