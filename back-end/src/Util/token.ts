/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      username: user.username,
      email: user.email,
    }, 
    process.env.JWEBT_SECRET!, 
    {
      expiresIn: '30d',
    }
  )
}