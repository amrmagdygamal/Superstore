import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const ProtectedRoute = ({ children }: any) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('userInfo')!)
  const token = getTokenFromLocalStorage?.token;

  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        localStorage.clear()
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