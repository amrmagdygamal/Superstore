import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { AnyObjectSchema } from 'yup';

// Sign Up user

const signUp = async (userInfo: any) => {
  const response = await axios.post(`${base_url}users/signup`, userInfo);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};



// login user 


const login = async (loginData: any) => {
  const response = await axios.post(`${base_url}users/login`, loginData);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  return response.data;
};


//  get orders 


const userService = {
  signUp,
  login,
};

export default userService;