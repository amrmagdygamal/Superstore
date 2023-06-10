import axios from 'axios';
import { base_url } from '../../utils/base_url';

// const getTokenFromLocalStorage = localStorage.getItem

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}orders/getallorders`);
  return response.data;
};

const OrderService = {
  getAllOrders,
};
export default OrderService;
