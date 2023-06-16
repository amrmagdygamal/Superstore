import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// const getTokenFromLocalStorage = localStorage.getItem

const getAllOrders = async () => {
  const response = await axios.get(`${base_url}orders/getallorders`);
  return response.data;
};

const getOrderbyuserid = async (id: string) => {
  const response = await axios.get(`${base_url}orders/getorderbyuserid/${id}`);
  return response.data;
};

const getMonthlyOrders = async () => {
  const response = await axios.get(
    `${base_url}orders/getMonthWiseOrderIncome`,
    config
  );

  return response.data;
};

const getAnOrder = async (id: string) => {
  const response = await axios.get(`${base_url}orders/getOrder/${id}`, config);

  return response.data;
};


const updateOrder = async (data: any) => {
  const response = await axios.put(`${base_url}orders/updateorder/${data.id}`, {status: data.status}, config);

  return response.data;
};

const getYearlyStats = async () => {
  const response = await axios.get(`${base_url}orders/getyearlyorders`, config);

  return response.data;
};

const OrderService = {
  getAllOrders,
  getOrderbyuserid,
  getMonthlyOrders,
  getYearlyStats,
  getAnOrder,
  updateOrder,
};
export default OrderService;
