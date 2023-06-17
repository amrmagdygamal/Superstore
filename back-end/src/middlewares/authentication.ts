import e, { NextFunction, Request, Response } from 'express';
import   {User, UserModel}  from '../model/UserModel';
import asyncHandler from 'express-async-handler';
import validateEnv from '../Util/validateEnv';
import jwt from 'jsonwebtoken'

export const auhtMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.startsWith(`Bearer`) ? req.headers.authorization.split(" ")[1] : undefined;
  
  try {
  if(token) {
  
      const decoded: any = jwt.verify(token, validateEnv.JWEBT_SECRET);
      const user = await UserModel.findOne({_id: decoded.id}).select("+email").exec();
    
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
  

export const isAdmin = asyncHandler(async(req: Request, _res: Response, next: NextFunction) => {
  const email  = req.user?.email;
  const adminUser = await UserModel.findOne({ email: email }).select("+email").exec();

  if(adminUser?.role !="admin"){
    throw new Error("You are not admin")
  } else {
    next()
  }
})