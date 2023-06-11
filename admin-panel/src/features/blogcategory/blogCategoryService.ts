import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogCategory = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBlogCategory = async (blogCategory: any) => {
  const response = await axios.post(`${base_url}blogcategory/`, blogCategory);
  return response.data;
};

const BlogCategoryService = {
  getBlogCategory,
  createBlogCategory,
};
export default BlogCategoryService;
