import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export { Navigate } from "react-router-dom";

type OpenRouterProps = {
  children: ReactNode;
};

export const OpenRouter = ({ children }: OpenRouterProps) => {
  let token: string | null = null;

  try {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      const { token: userToken } = JSON.parse(userInfo);
      token = userToken;
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
  }

  return token ? <>{children}</> : <Navigate to="/" replace={true} />;
};