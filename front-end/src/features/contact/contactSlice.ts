/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import contactService from './contactService';



export interface contactState {
  contact: any,
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
}


const initialState: contactState = {
  contact: "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const postQuery = createAsyncThunk(
  'contact/enquiry',
  async (contactData: any, thunkAPI) => {
    try {
      return await contactService.postQuery(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(postQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.contact = action.payload;
        state.message = 'success';
      })
      .addCase(postQuery.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default contactSlice.reducer;
