
import axios from 'axios';
import { base_url } from '../../utils/base_url';





// get all products 

const getCategories = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};

const getCategory = async (id: string) => {
  const response = await axios.get(`${base_url}prodcategory/${id}/`);
  return response.data;
};




const categoryService = {
  getCategories,
  getCategory,
};

export default categoryService;
