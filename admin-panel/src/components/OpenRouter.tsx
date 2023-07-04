import { ReactNode } from 'react';
import { Navigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { resetState } from '../features/auth/authSlice';
import jwtDecode from 'jwt-decode';

type OpenRouterProps = {
  children: ReactNode;
};

export const OpenRoutes = ({ children }: OpenRouterProps) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('admin') as string);
  const dispatch: AppDispatch = useDispatch();
  const token = getTokenFromLocalStorage?.token;


  if (token !== undefined) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.clear()
        dispatch(resetState)

        return children;
      }
      return (<Navigate to="/admin" replace={true} />);
    } catch (err) {
      console.error('Invalid token:', err);
      
      return children;
    }
  }

  return children;
};
