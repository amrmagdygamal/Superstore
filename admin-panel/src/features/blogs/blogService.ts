import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { BlogInfo } from './blogSlice';

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blogs/`);
  return response.data;
};

const createBlog = async (blog: BlogInfo) => {
  const response = await axios.post(`${base_url}blogs/`, blog, config);
  return response.data;
};

const updateBlog = async (blog: BlogInfo) => {
  const response = await axios.put(
    `${base_url}blog/${blog._id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      category: blog.blogData.category,
      images: blog.blogData.images,
    },
    config
  );

  return response.data;
};
const getBlog = async (id: string) => {
  const response = await axios.get(`${base_url}blogs/${id}`, config);

  return response.data;
};

const deleteBlog = async (id: string) => {
  const response = await axios.delete(`${base_url}blogs/${id}`, config);

  return response.data;
};

const Blogservice = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};
export default Blogservice;
