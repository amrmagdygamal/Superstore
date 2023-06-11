import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`);
  return response.data;
};


const createCoupon = async (coupon: any) => {
  const response = await axios.post(`${base_url}coupon/`, coupon);
  return response.data;
};


const Couponservice = {
  getCoupons,
  createCoupon
};
export default Couponservice;
