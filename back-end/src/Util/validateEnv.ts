import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";
export default cleanEnv(process.env, {
  MONGODB_CONNECT: str(),
  PORT: port(),
  JWEBT_SECRET: str(),
})