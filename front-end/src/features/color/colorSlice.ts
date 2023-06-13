/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import colorService from './colorServcie';



export interface colorState {
  colors: [],
  isError: boolean,
  isLoading: boolean,
  isSuccess: boolean,
  message: string,
  color?: any
}


const initialState: colorState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const getColors = createAsyncThunk(
  'color/get-colors',
  async (_, thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getColor = createAsyncThunk(
  'color/get-color',
  async (id: string, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction('Reset_all');


export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = action.payload;
        state.message = 'success';
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.color = action.payload;
        state.message = 'success';
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
