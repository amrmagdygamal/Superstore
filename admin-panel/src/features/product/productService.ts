import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProducts = async () => {
  const response = await axios.get(`${base_url}pruducts/`);
  return response.data;
};


const createProduct = async (product: any) => {
  const response = await axios.post(`${base_url}pruducts/`, product, config);
  return response.data;
};

const ProductService = {
  getProducts, createProduct

}
export default ProductService;