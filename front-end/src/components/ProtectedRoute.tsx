import { Navigate } from 'react-router-dom';import { ReactNode } from 'react';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { resetState } from '../features/user/userSlice';

type ProtRouterProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtRouterProps) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('userInfo') as string)
  const token = getTokenFromLocalStorage?.token;
  const dispatch: AppDispatch = useDispatch();


  if (token !== undefined) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.clear()
        dispatch(resetState)
        return <Navigate to="/login" replace={true} />;
      }
      return children;
    } catch (err) {
      console.error('Invalid token:', err);
      
      return <Navigate to="/login" replace={true} />;
    }
  }

  return <Navigate to="/login" replace={true} />;
};