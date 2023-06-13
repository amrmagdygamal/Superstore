
import axios from 'axios';
import { base_url } from '../../utils/base_url';




// get all products 

const getProducts = async () => {
  const response = await axios.get(`${base_url}pruducts/`);
  return response.data;
};

const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}pruducts/${id}/`);
  return response.data;
};




const productService = {
  getProducts,
  getProduct,
};

export default productService;
