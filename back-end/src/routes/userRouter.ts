import express from 'express';
import * as UserControllers from '../controllers/UserCtr'

export const userRouter = express.Router();

userRouter.post(
  '/signup', UserControllers.signup
);
userRouter.post(
  '/login', UserControllers.login
);
