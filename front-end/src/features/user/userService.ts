import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { AnyObjectSchema } from 'yup';
import { config } from '../../utils/axiosconfig';

// Sign Up user

const signUp = async (userInfo: any) => {
  const response = await axios.post(`${base_url}users/signup`, userInfo);
  if (response.data) {
    localStorage.setItem('userInfo', JSON.stringify(response.data));
    return response.data;
  }
};





const login = async (loginData: any) => {
  const response = await axios.post(`${base_url}users/login`, loginData);
  if (response.data) {
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}users/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};


//  get orders 


const userService = {
  signUp,
  login,
  getUserWishlist,
};

export default userService;