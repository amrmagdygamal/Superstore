import  jwt from 'jsonwebtoken'
import validateEnv from '../src/Util/validateEnv';

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, validateEnv.JWEBT_SECRET, { expiresIn: "5h" });
};

export default generateRefreshToken;