
import axios from 'axios';
import { base_url } from '../../utils/base_url';





// get all Colors 

const getColors = async () => {
  const response = await axios.get(`${base_url}colors/`);
  return response.data;
};

const getColor = async (id: string) => {
  const response = await axios.get(`${base_url}colors/${id}/`);
  return response.data;
};




const ColorService = {
  getColors,
  getColor,
};

export default ColorService;
