import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { User } from '../../types/User';
import { LoginData } from './authSlice';

const login = async (userInfo: LoginData) => {
  const response = await axios.post(`${base_url}users/admin-login`, userInfo);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;

/*   */