
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';





// get all products 

const getProducts = async () => {
  const response = await axios.get(`${base_url}pruducts/`);
  if(response.data) {
    return response.data;
  }
};

const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}pruducts/${id}/`);
  if(response.data) {
    return response.data;
  }
};

const addToWishList = async (id: string) => {
  const response = await axios.put(`${base_url}pruducts/wishlist/`, {prodId: id}, config);
  if(response.data) {
    return response.data;
  }
};


const deleteFromCart = async (id: string) => {
  const response = await axios.put(`${base_url}users/delete-from-cart/`, {prodId: id}, config);
  if(response.data) {
    return response.data;
  }
};




const productService = {
  getProducts,
  getProduct,
  addToWishList,
};

export default productService;
