import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);
  return response.data;
};


const createBlog = async (product: any) => {
  const response = await axios.post(`${base_url}blogs/`, product, config);
  return response.data;
};

const Blogservice = {
  getBlogs, createBlog
};
export default Blogservice;
