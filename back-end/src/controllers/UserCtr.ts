import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { generateToken } from "../Util/token";
import UserModel from "../model/UserModel";
import User from '../model/UserModel'
import bcrypt from 'bcryptjs';


export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { username, email, password } = req.body;

  try {
    const findUsername = await UserModel.findOne({ username: username }).exec();

    if (findUsername) {
      res.json({
        msg: "Username already taken. Please choose a different one or log in instead.",
        success: false,
      });
    }
  
    const findEmail = await UserModel.findOne({ email: email }).exec();
  
    if (findEmail) {
      res.json({
        msg: "Email already taken. Please choose a different one or log in instead.",
        success: false,
      });
    }
  
    const newuser = await UserModel.create(req.body);
    res.json(newuser);

  } catch (error) {
    next(error)
  }
});


