import axios from 'axios';
import { base_url } from '../../utils/base_url';

// const getTokenFromLocalStorage = localStorage.getItem

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}orders/getallorders`);
  return response.data;
};


const getOrderbyuserid = async (id: string) => {
  const response = await axios.get(`${base_url}orders/getorderbyuserid/${id}`);
  return response.data;
};

const OrderService = {
  getAllOrders,
  getOrderbyuserid

};
export default OrderService;
