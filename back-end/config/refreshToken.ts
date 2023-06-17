import  jwt from 'jsonwebtoken'
import validateEnv from '../src/Util/validateEnv';

const generateRefreshToken = (id: any) => {
  return jwt.sign({ id }, validateEnv.JWEBT_SECRET, { expiresIn: "5h" });
};

export default generateRefreshToken;