import express from 'express';
import * as UserControllers from '../controllers/UserCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

export const userRouter = express.Router();

userRouter.post('/signup', UserControllers.signup);
userRouter.put('/login', UserControllers.login);
userRouter.put('/refresh', UserControllers.handleRefreshToken); 
userRouter.post('/forgot-password-token', UserControllers.forgotPasswordToken);
userRouter.post('/reset-password/:token', UserControllers.resetPassword);
userRouter.post('/admin-login', UserControllers.AdminLogin);
userRouter.put('/:id', auhtMiddleware, UserControllers.updatePassword);
userRouter.post('/add-to-cart', auhtMiddleware, UserControllers.addToCart);
userRouter.put(
  '/delete-from-cart',
  auhtMiddleware,
  UserControllers.deleteFromCart
  );
  userRouter.put('/logout',auhtMiddleware, UserControllers.logout);   
userRouter.post(
  '/cart/applycoupon',
  auhtMiddleware,
  UserControllers.applyCoupon
);
userRouter.get('/cart', auhtMiddleware, UserControllers.getUserCart);
userRouter.get('/all-users', auhtMiddleware, isAdmin, UserControllers.allUsers);
userRouter.get('/:id', auhtMiddleware, isAdmin, UserControllers.getuser);

userRouter.delete('/empty-cart', auhtMiddleware, UserControllers.emptyCart);
userRouter.get('/wishlist', auhtMiddleware, UserControllers.getWishList);
userRouter.delete('/:id', auhtMiddleware, isAdmin, UserControllers.deleteUser);
userRouter.put('/edit-user', auhtMiddleware, UserControllers.updateUser);
userRouter.put('/save-address', auhtMiddleware, UserControllers.saveAddress);
userRouter.put(
  '/block-user/:id',
  auhtMiddleware,
  isAdmin,
  UserControllers.blockUser
);
userRouter.put(
  '/unblock-user/:id',
  auhtMiddleware,
  isAdmin,
  UserControllers.unBlockUser
);
