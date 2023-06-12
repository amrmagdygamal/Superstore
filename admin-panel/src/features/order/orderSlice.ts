/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import OrderService from './orderService';

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

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
      });
  },
});

export default OrderSlice.reducer;
