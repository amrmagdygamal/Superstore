import { LoginData } from "./User";

interface RootState {
  auth: {
    userInfo: LoginData;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    
  }
}

