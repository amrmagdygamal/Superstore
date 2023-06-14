/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService';
import { toast } from 'react-toastify';
import { UserInfo } from '../../types/UserInfo';

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

export const logout = createAsyncThunk(
  'user/logout',
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


export interface UserState {
  userInfor: any;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  user?: any;
  wishlist?: any;
  addCart?: any;
  cart?: any
  deletFromCart?: any
}

const getUserformLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : null;

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
        if (state.isSuccess === true) {
          toast.info('Signed Up successfully');
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Failed to signup');
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
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Failed to login');
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
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
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
