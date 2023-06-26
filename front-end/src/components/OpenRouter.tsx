
import { Navigate} from 'react-router-dom';



export const OpenRoutes = ({ children }: any) => {
  const getTokenFromLocalStorage = JSON.parse(localStorage.getItem('userInfo')!);

  return getTokenFromLocalStorage?.token === null ? children : (<Navigate to="/" replace={true} />)
};
