import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { CategoryInfo } from './prodCategorySlice';
import { config } from '../../utils/axiosconfig';

const getProdCategory = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};


const createCategory = async (category: CategoryInfo) => {
  const response = await axios.post(`${base_url}prodcategory/`, category, config);
  return response.data;
};

const getCategory = async (id: string) => {
  const response = await axios.get(`${base_url}prodcategory/${id}`, config);
  return response.data;
};

const updateCategory = async (category: CategoryInfo) => {
  const response = await axios.put(`${base_url}prodcategory/${category._id}`, category, config);
  return response.data;
};



const deleteCategory = async (id: string) => {
  const response = await axios.delete(`${base_url}prodcategory/${id}`, config);
  return response.data;
};



const ProdCategoryService = {
  getProdCategory,
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
export default ProdCategoryService;
