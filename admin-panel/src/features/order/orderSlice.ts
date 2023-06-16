/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from './orderService';
import { User } from '../../types/User';
import { toast } from 'react-toastify';

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


export const getAnOrder = createAsyncThunk(
  'order/order',
  async (id: string, thunkAPI) => {
    try {
      return await OrderService.getAnOrder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const updateOrder = createAsyncThunk(
  'order/update-order',
  async (data: any, thunkAPI) => {
    try {
      return await OrderService.updateOrder(data);
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
  AnOrder?: any
  updateOrder?: any
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
      .addCase(getAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.AnOrder = action.payload;
        state.message = 'success';
      })
      .addCase(getAnOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updateOrder = action.payload;
        state.message = 'success';
        if(state.isSuccess === true) {
          toast.success("Order Updated Successfully!")
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isError === true) {
          toast.success("some Thing went wrong!")
        }
      })
      .addCase(resetState, () => initialState)
  },
});

export default OrderSlice.reducer;
