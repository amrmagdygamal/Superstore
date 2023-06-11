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


const Colorservice = {
  getColors,
  createColor
};
export default Colorservice;
