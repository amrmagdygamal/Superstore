import express from 'express';
import * as UserControllers from '../controllers/UserCtr'
import { auhtMiddleware, isAdmin } from '../middlewares/authentication';

export const userRouter = express.Router();

userRouter.post('/signup', UserControllers.signup);
userRouter.post('/login', UserControllers.login);
userRouter.get('/all-users', auhtMiddleware, isAdmin, UserControllers.allUsers);
userRouter.get('/refresh', UserControllers.handleRefreshToken)
userRouter.get('/logout', UserControllers.logout)

userRouter.get('/:id', auhtMiddleware, isAdmin, UserControllers.getuser);
userRouter.delete('/:id', auhtMiddleware, isAdmin, UserControllers.deleteUser);
userRouter.put('/edit-user', auhtMiddleware, UserControllers.updateUser)
userRouter.put('/block-user/:id', auhtMiddleware, isAdmin, UserControllers.blockUser)
userRouter.put('/unblock-user/:id', auhtMiddleware, isAdmin, UserControllers.unBlockUser
)
