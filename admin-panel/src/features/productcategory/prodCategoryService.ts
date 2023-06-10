import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProdCategory = async () => {
  const response = await axios.get(`${base_url}prodcategory/`);
  return response.data;
};

const ProdCategoryService = {
  getProdCategory,
};
export default ProdCategoryService;
