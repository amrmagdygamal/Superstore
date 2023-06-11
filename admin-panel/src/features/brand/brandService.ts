import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBrands = async () => {
  const response = await axios.get(`${base_url}brands/`);
  return response.data;
};


const createBrand = async (brand: any) => {
  const response = await axios.post(`${base_url}brands/`, brand);
  return response.data;
};


const BrandService = {
  getBrands,
  createBrand
};
export default BrandService;
