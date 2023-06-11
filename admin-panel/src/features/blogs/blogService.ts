import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);
  return response.data;
};

const createCategory = async (category: any) => {
  const response = await axios.post(`${base_url}prodcategory/`, category);
  return response.data;
};

const Blogservice = {
  getBlogs,
};
export default Blogservice;
