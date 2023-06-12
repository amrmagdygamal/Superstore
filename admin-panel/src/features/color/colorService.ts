import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getColors = async () => {
  const response = await axios.get(`${base_url}colors/`);
  return response.data;
};


const createColor = async (color: any) => {
  const response = await axios.post(`${base_url}colors/`, color);
  return response.data;
};



const updateColor = async (color: any) => {
  const response = await axios.put(`${base_url}colors/${color._id}`, {title: color.colorData.title});
  return response.data;
};


const getColor = async (id: string) => {
  const response = await axios.get(`${base_url}colors/${id}`);
  return response.data;
};

const deleteColor = async (id: string) => {
  const response = await axios.delete(`${base_url}colors/${id}`);
  return response.data;
};


const Colorservice = {
  getColors,
  createColor,
  updateColor,
  getColor,
  deleteColor,
};
export default Colorservice;
