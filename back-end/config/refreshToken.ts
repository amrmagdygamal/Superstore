import  jwt from 'jsonwebtoken'

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWEBT_SECRET ? process.env.JWEBT_SECRET : "something sljflakjf", { expiresIn: "12h" });
};

export default generateRefreshToken;