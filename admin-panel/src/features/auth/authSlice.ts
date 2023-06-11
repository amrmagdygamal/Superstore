/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './authService';
import { User } from '../../types/User';

const getUserformLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

const initialState = {
  userInfo: getUserformLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};



export const login = createAsyncThunk(
  'auth/admin-login',
  async (userInfo: LoginData, thunkAPI) => {
    try {
      return await authService.login(userInfo);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userInfo = action.payload;
        state.message = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      });
  },
});

export default authSlice.reducer;
