import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getProducts = async () => {
  const response = await axios.get(`${base_url}products/`);
  return response.data;
};

const createProduct = async (product: any) => {
  const response = await axios.post(`${base_url}products/`, product, config);
  return response.data;
};

const updateProduct = async (product: any) => {
  const response = await axios.put(
    `${base_url}products/${product._id}`,
    product,
    config
  );

  return response.data;
};
const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}products/${id}`, config);

  return response.data;
};

const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${base_url}products/${id}`, config);

  return response.data;
};

const ProductService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
export default ProductService;
