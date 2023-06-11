import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProdCategory = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};


const createCategory = async (category: any) => {
  const response = await axios.post(`${base_url}prodcategory/`, category);
  return response.data;
};


const ProdCategoryService = {
  getProdCategory,
  createCategory
};
export default ProdCategoryService;
