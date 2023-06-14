import axios from 'axios';
import { base_url } from '../../utils/base_url';
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




const logout = async () => {
  const response = await axios.delete(`${base_url}users/logout`);
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


const addToCart = async (prodData: any) => {
  const response = await axios.post(`${base_url}users/add-to-cart`,{ prodId: prodData.id, colors: prodData.colors, quantity: prodData.quantity }, config);
  if (response.data) {
    return response.data;
  }
};



const getUserCart = async () => {
  const response = await axios.get(`${base_url}users/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const deleteFromCart = async (id: string) => {
  const response = await axios.put(`${base_url}users/delete-from-cart/`, {prodId: id}, config);
  if(response.data) {
    return response.data;
  }
};





//  get orders 


const userService = {
  signUp,
  login,
  logout,
  getUserWishlist,
  addToCart,
  getUserCart,
  deleteFromCart,
};

export default userService;