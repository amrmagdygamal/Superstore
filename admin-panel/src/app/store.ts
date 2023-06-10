import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import prodCategoryReducer from '../features/productcategory/prodCategorySlice';
import blogCategoryReducer from '../features/blogcategory/blogCategorySlice';
import colorReducer from '../features/color/colorSlice';
import blogReducer from '../features/blogs/blogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    prodCategory: prodCategoryReducer,
    blogCategory: blogCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
