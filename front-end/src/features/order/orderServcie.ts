
import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';





// get all Colors 

const createOrder = async (orderData: any) => {
  const response = await axios.post(`${base_url}orders/`, orderData, config);
  return response.data;
};

const getorder = async (id: string) => {
  const response = await axios.get(`${base_url}orders/${id}/`);
  return response.data;
};




const orderService = {
  createOrder,
  getorder,
};

export default orderService;
