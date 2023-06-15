import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import productCategoryReducer from '../features/category/categorySlice';
import blogCategoryReducer from '../features/blogCategory/blogCategorySlice';
import colorReducer from '../features/color/colorSlice';
import orderReducer from '../features/order/orderSlice';
// import couponReducer from '../features/coupon/couponSlice';
import blogReducer from '../features/blog/blogSlice';
import contactReducer from '../features/contact/contactSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    blogCategory: blogCategoryReducer,
    color: colorReducer,
    order: orderReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;