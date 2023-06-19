
import { Navigate} from 'react-router-dom';



export const ProtectedRoute = ({ children }: any) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('userInfo')!);

  return getTokenFromLocalStorage?.token !== undefined ? children : (<Navigate to="/login" replace={true} />)
};
