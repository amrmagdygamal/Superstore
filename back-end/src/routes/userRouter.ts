import asyncHandler from 'express-async-handler';
import express, {Request, Response} from 'express';
import UserModel, { User } from '../model/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Util/token';

export const userRouter = express.Router();

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    } as User);
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  })
);
userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email }).select("+password +email").exec();
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
