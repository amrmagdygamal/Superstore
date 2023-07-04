import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { resetState } from '../features/auth/authSlice';

type PrivRouterProps = {
  children: ReactNode;
};


export const PrivateRoutes = ({ children }: PrivRouterProps) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('admin') as string)
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromLocalStorage?.token;

  if (token !== undefined) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.clear()
        dispatch(resetState)
        return <Navigate to="/" replace={true} />;
      }
      return children;
    } catch (err) {
      console.error('Invalid token:', err);
      
      return <Navigate to="/" replace={true} />;
    }
  }

  return <Navigate to="/" replace={true} />;
};