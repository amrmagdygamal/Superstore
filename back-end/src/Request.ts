import { User } from "./model/UserModel";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}
