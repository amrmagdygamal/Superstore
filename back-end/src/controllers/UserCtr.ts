import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { generateToken } from "../Util/token";
import UserModel from "../model/UserModel";
import bcrypt from 'bcryptjs';



// register a user
export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const { username, email, password } = req.body;

  try {

    if (!username || !email || !password) {
      res.json({
        msg: "Parameters missing",
        success: false,
      });
    }
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


// login a user
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

  const {email, password } = req.body;

  try {

      if (!email || !password) {
        res.json({
            msg: "Parameters missing",
            success: false,
          });
      }
  
      const finduser = await UserModel.findOne({ email: email }).select("+password").exec();
  
    if(finduser && await bcrypt.compare(password, finduser.password)) {
      res.json({
        _id: finduser?._id,
        username: finduser?.username,
        email: finduser?.email,
        token: generateToken(finduser?._id)
      })
    } else {
      throw new Error('Invalid Credentials')
    }

  } catch (error) {
    next(error)
  }
});

