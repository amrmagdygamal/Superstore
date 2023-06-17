import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { BrandInfo } from './brandSlice';
import { config } from '../../utils/axiosconfig';

const getBrands = async () => {
  const response = await axios.get(`${base_url}brands/`, config);
  return response.data;
};


const createBrand = async (brand: BrandInfo) => {
  const response = await axios.post(`${base_url}brands/`, brand, config);
  return response.data;
};


const updateBrand = async (brandData: BrandInfo) => {
  const response = await axios.put(`${base_url}brands/${brandData._id}`, {title: brandData.title}, config);
  return response.data;
};


const getBrand = async (id: string) => {
  const response = await axios.get(`${base_url}brands/${id}`, config);
  return response.data;
};

const deleteBrand = async (id: string) => {
  const response = await axios.delete(`${base_url}brands/${id}`, config);
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
