import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { AnyObjectSchema } from 'yup';
import { config } from '../../utils/axiosconfig';

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createBlogCategory = async (blogCategory: any) => {
  const response = await axios.post(`${base_url}blogcategory/`, blogCategory, config);
  return response.data;
};

const updateBlogcategory = async (blogcategory: any) => {
  const response = await axios.put(`${base_url}blogcategorys/${blogcategory._id}`, {title: blogcategory.blogcategoryData.title}, config);
  return response.data;
};


const getBlogcategory = async (id: string) => {
  const response = await axios.get(`${base_url}blogcategorys/${id}`);
  return response.data;
};

const deleteBlogcategory = async (id: string) => {
  const response = await axios.delete(`${base_url}blogcategorys/${id}`);
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
