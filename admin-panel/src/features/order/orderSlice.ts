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


export const getMonthlyOrders = createAsyncThunk(
  'orders/monthlydata',
  async (_, thunkAPI) => {
    try {
      return await OrderService.getMonthlyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const getYearlyStats = createAsyncThunk(
  'orders/yearlydata',
  async (_, thunkAPI) => {
    try {
      return await OrderService.getYearlyStats();
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
  orderMonthlyData?: any
  orderYearlyStats?: any

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
      .addCase(getMonthlyOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderMonthlyData = action.payload;
        state.message = 'success';
      })
      .addCase(getMonthlyOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getYearlyStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orderYearlyStats = action.payload;
        state.message = 'success';
      })
      .addCase(getYearlyStats.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState)
  },
});

export default OrderSlice.reducer;
