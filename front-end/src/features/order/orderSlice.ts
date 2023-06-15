/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from './orderServcie';
import { toast } from 'react-toastify';



export interface orderState {
  orders: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  crOrder?: any,
  order?: any
}


const initialState: orderState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const createOrder = createAsyncThunk(
  'order/create-order',
  async (orderData: any, thunkAPI) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getorder = createAsyncThunk(
  'order/get-order',
  async (id: string, thunkAPI) => {
    try {
      return await orderService.getorder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.crOrder = action.payload;
        state.message = 'success';
        if(state.isSuccess === true ) {
          toast.info("Order Created successfully");
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isError === true ) {
          toast.info("Order Created successfully");
        }
      })
      .addCase(getorder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getorder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.order = action.payload;
        state.message = 'success';
      })
      .addCase(getorder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default orderSlice.reducer;
