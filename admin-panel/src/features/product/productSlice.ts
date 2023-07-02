/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ProductService from './productService';
import { toast } from 'react-toastify';

export const getProducts = createAsyncThunk(
  'product/get-products',
  async (_, thunkAPI) => {
    try {
      return await ProductService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
  );

  
export const uploadImg = createAsyncThunk(
  'upload/product-image',
  async (data: any, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append('images', data[i]);
      }
      return await ProductService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

  
  export const getProduct = createAsyncThunk(
    'product/get-product',
    async (id: string, thunkAPI) => {
      try {
        return await ProductService.getProduct(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );

export const createProduct = createAsyncThunk(
  'product/create-products',
  async (productData: any, thunkAPI) => {
    try {
      return await ProductService.createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);






export const updateProduct = createAsyncThunk(
  'product/update-product',
  async (product: any, thunkAPI) => {
    try {
      return await ProductService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete-product',
  async (id: string, thunkAPI) => {
    try {
      return await ProductService.deleteProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export interface Image {
  public_id: string;
  url: string;
}



export const deleteImg = createAsyncThunk(
  "delete/product-image",
  async (id: string, thunkAPI) => {
    try {
      return await ProductService.deleteImg(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);




// interface Product {
//   name: string
//   images : []
//   brand: string
//   category: string
//   description: string
//   price: number
//   countInStock: number
//   ratings: []
// }

interface ProductState {
  products: [];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  createdProduct?: any
  updatedProduct?: any;
  deletedProduct?: any;
  productName?: string;
  productDesc?: string;
  productCategory?: string;
  productPrice?: number;
  productImages?: Array<Image>;
  productTag?: string
  productBrand?: string
  productColor?: any
  productQuant?: number
  images?: Array<Image>;
}

const initialState: ProductState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
  
};

export const resetState = createAction('Reset_all');

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (buildeer) => {
    buildeer
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = action.payload;
        state.message = 'success';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
      })
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        if (state.isSuccess === true) {
          toast.success('image Uploaded successfully!');
        }
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        const isDataComplete =
        action.payload.name !== undefined &&
        action.payload.description !== undefined &&
        action.payload.category !== undefined &&
        action.payload.price !== undefined &&
        action.payload.color !== undefined &&
        action.payload.brand !== undefined &&
        action.payload.tag !== undefined &&
        action.payload.countInStock !== undefined;
    
      // If all the required data has been fetched, set the productImages property
      if (isDataComplete) {
        state.productName = action.payload.name;
        state.productDesc = action.payload.description;
        state.productCategory = action.payload.category;
        state.productPrice = action.payload.price;
        state.productColor = action.payload.color;
        state.productBrand = action.payload.brand;
        state.productTag = action.payload.tag;
        state.productQuant = action.payload.countInStock;
        state.productImages = action.payload.images;
      }
        
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success('Product Added Successfullly!');
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error.message ?? '';
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success('Product Updated Successfullly!');
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProduct = action.payload;
        if (state.isSuccess === true) {
          toast.success('Product Deleted Successfullly!');
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "Some Thing went wrong";
        if (state.isError === true) {
          toast.error('Some Thing went wrong!');
        }
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
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
