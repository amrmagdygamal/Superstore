import axios from 'axios';
import { base_url } from '../../utils/base_url';






// get all blogCategorys 

const getblogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const getblogCategory = async (id: string) => {
  const response = await axios.get(`${base_url}blogcategory/${id}/`);
  return response.data;
};




const blogCategoryService = {
  getblogCategories,
  getblogCategory,
};

export default blogCategoryService;
