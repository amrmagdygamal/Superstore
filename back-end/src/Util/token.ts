import jwt from 'jsonwebtoken';

export const generateToken = (id:string) => {
  return jwt.sign(
    { id }, 
    process.env.JWEBT_SECRET as string, 
    {
      expiresIn: '8h',
    }
  )
}