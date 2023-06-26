import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { BlogcategInfo } from './blogCategorySlice';

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBlogCategory = async (blogCategory: BlogcategInfo) => {
  const response = await axios.post(`${base_url}blogcategory/`, blogCategory, config);
  return response.data;
};

const getBlogcategory = async (id: string) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`);
  return response.data;
};

const updateBlogcategory = async (blogcategory: BlogcategInfo) => {
  const response = await axios.put(`${base_url}blogcategory/${blogcategory._id}`, blogcategory, config);
  return response.data;
};



const deleteBlogcategory = async (id: string) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`);
  return response.data;
};



const BlogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogcategory,
  updateBlogcategory,
  deleteBlogcategory
};
export default BlogCategoryService;
