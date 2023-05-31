import { NextFunction, Request, Response } from 'express';
import { User } from '../model/UserModel';
import asyncHandler from 'express-async-handler';
import validateEnv from '../Util/validateEnv';
import jwt from 'jsonwebtoken'

export const auhtMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.startsWith(`Bearer`) ? req.headers.authorization.split(" ")[1] : undefined;
  
  try {
  if(token) {
  
      const decoded = jwt.verify(token, validateEnv.JWEBT_SECRET) as jwt.JwtPayload;
      const user = await User.findById(decoded._id);
    
      if (!user) {
        throw new Error('User not found');
      }
    
      req.user = user;
      next();
  }
  } catch (error) {
  next(error);
  }
});
  

export const isAdmin = asyncHandler(async(req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });

  if(adminUser.role !== "admin"){
    throw new Error("You are not admin")
  } else {
    next()
  }
})