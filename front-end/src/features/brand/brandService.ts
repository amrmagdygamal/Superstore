import axios from 'axios';
import { base_url } from '../../utils/base_url';





// get all products 

const getBrands = async () => {
  const response = await axios.get(`${base_url}brands/`);
  return response.data;
};

const getBrand = async (id: string) => {
  const response = await axios.get(`${base_url}brands/${id}/`);
  return response.data;
};




const brandService = {
  getBrands,
  getBrand,
};

export default brandService;
