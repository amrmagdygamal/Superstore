/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { toast } from 'react-toastify';


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



export const signUpUser = createAsyncThunk(
  'user/signup',
  async (userInfo: any, thunkAPI) => {
    try {
      return await userService.login(userInfo);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: any, thunkAPI) => {
    try {
      return await userService.login(loginData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userInfo = action.payload;
        state.message = 'success';
        if(state.isSuccess === true) {
          toast.info("Signed Up successfully")
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isSuccess === false) {
          toast.error("Failed to signup")
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userInfo = action.payload;
        state.message = 'success';
        if(state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token)
          toast.info("Logded in  successfully")
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if(state.isSuccess === false) {
          toast.error("Failed to login")
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
