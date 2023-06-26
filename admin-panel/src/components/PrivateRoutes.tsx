import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const PrivateRoutes = ({ children }: any) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('admin')!)
  const token = getTokenFromLocalStorage?.token;

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.clear()
        return <Navigate to="/login-admin" replace={true} />;
      }
      return children;
    } catch (err) {
      console.error('Invalid token:', err);
      
      return <Navigate to="/login-admin" replace={true} />;
    }
  }

  return <Navigate to="/login-admin" replace={true} />;
};