/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import EnquirieService from './enquiriesService';

export const getEnquiries = createAsyncThunk(
  'enquire/get-enquiries',
  async (_, thunkAPI) => {
    try {
      return await EnquirieService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);




export const getEnquiry = createAsyncThunk(
  'enquiry/get-enquiry',
  async (id: string, thunkAPI) => {
    try {
      return await EnquirieService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateEnquiry = createAsyncThunk(
  'enquiry/update-enquiry',
  async (Enquiry: any, thunkAPI) => {
    try {
      return await EnquirieService.updateEnquiry(Enquiry);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  'enquiry/delete-enquiry',
  async (id: string, thunkAPI) => {
    try {
      return await EnquirieService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface EquiryState  {

  enquiries: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdEnquiry?: any
  updatedEnquiry?: any;
  deletedEnquiry?: any;
  enquiryName?: string;
  enquiryEmail?: string;
  enquiryMobile?: number;
  enquiryComment?: string;
  enquiryStatus?: string;
}


const initialState: EquiryState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const resetState = createAction('Reset_all');


export const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiries = action.payload;
        state.message = 'success';
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiryName = action.payload.name;
        state.enquiryEmail = action.payload.email;
        state.enquiryMobile = action.payload.mobile;
        state.enquiryComment = action.payload.comment;
        state.enquiryStatus = action.payload.status;
      })
      .addCase(getEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
      })
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
