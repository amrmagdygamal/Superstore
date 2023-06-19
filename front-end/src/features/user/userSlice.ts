/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import userService from './userService';
import { toast } from 'react-toastify';
import { UserInfo } from '../../types/UserInfo';

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (userInfo: any, thunkAPI) => {
    try {
      return await userService.signUp(userInfo);
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

export const logout = createAsyncThunk(
  'user/logout-user',
  async (_, thunkAPI) => {
    try {
      return await userService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  'user/wishlist',
  async (_, thunkAPI) => {
    try {
      return await userService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToCart = createAsyncThunk(
  'user/add-cart',
  async (prodData: any, thunkAPI) => {
    try {
      return await userService.addToCart(prodData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  'user/cart',
  async (_, thunkAPI) => {
    try {
      return await userService.getUserCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  'user/delete-from-cart',
  async (prodId: string, thunkAPI) => {
    try {
      return await userService.deleteFromCart(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const forgotPass = createAsyncThunk(
  'user/forgot-pass',
  async (email: any, thunkAPI) => {
    try {
      return await userService.forgotPass(email);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPass = createAsyncThunk(
  'user/reset-pass',
  async (data: any, thunkAPI) => {
    try {
      return await userService.resetPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export interface UserState {
  userInfor: UserInfo;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: any;
  user?: UserInfo;
  wishlist?: any;
  addCart?: any;
  cart?: any;
  deletFromCart?: any;
  logoutuser?: any;
  forgotPassuser?: any;
  resetPassuser?: any;
}

const getUserformLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : '';

const initialState: UserState = {
  userInfor: getUserformLocalStorage,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

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
        state.userInfor = action.payload;
        state.message = 'success';
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        state.message =
          action.payload?.response?.data?.message ?? action.error.message;
        if (state.isError === true) {
          toast.error(action.payload.response.data.error, {
            containerId: 'custom-container',
            style: { width: '500px', alignSelf: "center" }
          });
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
        state.message = 'success';
        if (state.isSuccess === true) {
          localStorage.setItem('token', action.payload.token);
          toast.info('Logded in  successfully');
        }
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error(action.payload.response.data.error, {
            containerId: 'custom-container',
            style: { width: '500px', alignSelf: "center" }
          });
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.logoutuser = action.payload;
        state.message = 'success';
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload;
        state.message = 'success';
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.addCart = action.payload;
        state.message = 'success';
        if (state.isSuccess === true) {
          toast.info('Added to cart successfully');
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('some thing went wrong');
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.cart = action.payload;
        state.message = 'success';

      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletFromCart = action.payload;
        state.message = 'success';
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(forgotPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.forgotPassuser = true;
        state.message = 'success';
        if (state.isSuccess === true) {
          toast.error('Email send successFully');
        }
      })
      .addCase(forgotPass.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('some thing went wrong');
        }
      })
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.resetPassuser = true;
        state.message = 'success';
        if (state.isSuccess === true) {
          toast.error('password Updated Successfully');
        }
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('some thing went wrong');
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
