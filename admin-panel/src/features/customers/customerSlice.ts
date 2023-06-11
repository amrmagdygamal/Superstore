/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customerService from './customerService';


const initialState = {
  cutomers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};


export const getCustomers = createAsyncThunk(
  'customer/get-customers',
  async (_,thunkAPI) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');
export const customerSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cutomers = action.payload;
        state.message = 'success';
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default customerSlice.reducer;
