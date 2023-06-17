import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { User } from '../../types/User';
import { AnyObjectSchema } from 'yup';

// login admin 

const login = async (userInfo: any) => {
  const response = await axios.post(`${base_url}users/admin-login`, userInfo);
  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data));
  }
  return response.data;
};


//  get orders 


const authService = {
  login,
};

export default authService;

/*   */
