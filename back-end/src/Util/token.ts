/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';

export const generateToken = (id:string) => {
  return jwt.sign(
    { id }, 
    process.env.JWEBT_SECRET!, 
    {
      expiresIn: '7h',
    }
  )
}