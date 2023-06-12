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

const updateProduct = async (product: any) => {
  const response = await axios.put(
    `${base_url}pruducts/${product._id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      category: product.productData.category,
      author: product.productData.author,
      images: product.productData.images,
    },
    config
  );

  return response.data;
};
const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}pruducts/${id}`, config);

  return response.data;
};

const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${base_url}pruducts/${id}`, config);

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
