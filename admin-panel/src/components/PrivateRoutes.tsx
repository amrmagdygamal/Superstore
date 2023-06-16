import { ReactNode } from 'react';
import { Navigate} from 'react-router-dom';

type OpenRouterProps = {
  children: ReactNode;
};

export const PrivateRoutes = ({ children }: OpenRouterProps) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('admin')!);

  return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to="/" replace={true} />)
};
