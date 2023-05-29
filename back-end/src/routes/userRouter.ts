import asyncHandler from 'express-async-handler';
import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Util/token';
import UserModel from '../model/UserModel'
import * as UserControllers from '../controllers/UserCtr'

export const userRouter = express.Router();

userRouter.post(
  '/signup', UserControllers.signup
);
userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).json({ message: 'Invalid email or password' });
  })
);
