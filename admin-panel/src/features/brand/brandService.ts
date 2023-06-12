import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { BrandInfo } from './brandSlice';

const getBrands = async () => {
  const response = await axios.get(`${base_url}brands/`);
  return response.data;
};


const createBrand = async (brand: BrandInfo) => {
  const response = await axios.post(`${base_url}brands/`, brand);
  return response.data;
};


const updateBrand = async (brand: BrandInfo) => {
  const response = await axios.put(`${base_url}brands/${brand._id}`, {title: brand.brandData.title});
  return response.data;
};


const getBrand = async (id: string) => {
  const response = await axios.get(`${base_url}brands/${id}`);
  return response.data;
};

const deleteBrand = async (id: string) => {
  const response = await axios.delete(`${base_url}brands/${id}`);
  return response.data;
};


const BrandService = {
  getBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
};
export default BrandService;
