import express from 'express';
import * as UserControllers from '../controllers/UserCtr';
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

export const userRouter = express.Router();

userRouter.post('/signup', UserControllers.signup);
userRouter.post('/forgot-password-token', UserControllers.forgotPasswordToken);
userRouter.post('/reset-password/:token', UserControllers.resetPassword);
userRouter.post('/login', UserControllers.login);
userRouter.post('/admin-login', UserControllers.AdminLogin);
userRouter.put('/add-to-cart', auhtMiddleware, UserControllers.addToCart);
userRouter.post('/cart/applycoupon', auhtMiddleware, UserControllers.applyCoupon)
userRouter.post('/cart', auhtMiddleware, UserControllers.getUserCart);
userRouter.put('/:id', auhtMiddleware, UserControllers.updatePassword);
userRouter.get('/all-users', auhtMiddleware, isAdmin, UserControllers.allUsers);
userRouter.get('/refresh', UserControllers.handleRefreshToken);
userRouter.get('/logout', UserControllers.logout);

userRouter.get('/:id', auhtMiddleware, isAdmin, UserControllers.getuser);
userRouter.delete('/empty-cart', auhtMiddleware, UserControllers.emptyCart);
userRouter.get('/wishlist', auhtMiddleware, UserControllers.getWishList);
userRouter.delete('/:id', auhtMiddleware, isAdmin, UserControllers.deleteUser);
userRouter.put('/edit-user', auhtMiddleware, UserControllers.updateUser);
userRouter.get('/save-address', auhtMiddleware, UserControllers.saveAddress);
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
