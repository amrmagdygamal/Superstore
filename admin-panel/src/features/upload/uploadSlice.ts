import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";
import { toast } from "react-toastify";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data: any, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImg = createAsyncThunk(
  "delete/images",
  async (id: string, thunkAPI) => {
    try {
      return await uploadService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};
export const uploadSlice = createSlice({
  name: "imaegs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(uploadImg.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(uploadImg.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.images = action.payload;
      if(state.isSuccess ===true) {
        toast.success("image Uploaded successfully!")
      }
    })
    .addCase(uploadImg.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error.message
      ?? "";
    })
    .addCase(deleteImg.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteImg.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.images = [];
      if(state.isSuccess ===true) {
        toast.success("image deleted successfully!")
      }
    })
    .addCase(deleteImg.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error.message ?? "";
      if(state.isError === true){
        toast.error("some thing went wrong!")
      }
    });

  },
});
export default uploadSlice.reducer;