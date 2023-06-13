import axios from 'axios';
import { base_url } from '../../utils/base_url';





// get all products 

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);
  return response.data;
};

const getBlog = async (id: string) => {
  const response = await axios.get(`${base_url}blogs/${id}/`);
  return response.data;
};




const blogService = {
  getBlogs,
  getBlog,
};

export default blogService;
