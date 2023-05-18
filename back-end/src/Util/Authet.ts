import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import validateEnv from "./validateEnv";

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (authorization) {
    const token = authorization.slice(7, authorization.length)
    const decode = jwt.verify(
      token,
      validateEnv.JWEBT_SECRET
    )
    req.user = decode as {
      _id: string
      username: string
      email: string
      token: string
    }
    next()
  } else {
    res.status(401).json({ message: 'not Authorized'})
  }

}

export default isAuth;