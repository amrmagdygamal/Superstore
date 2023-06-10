import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProducts = async () => {
  const response = await axios.get(`${base_url}pruducts/`);
  return response.data;
};

const ProductService = {
  getProducts

}
export default ProductService;