import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);
  return response.data;
};

const Blogservice = {
  getBlogs,
};
export default Blogservice;
