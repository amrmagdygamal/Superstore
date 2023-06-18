import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { CouponInfo } from './couponSlice';
import { config } from '../../utils/axiosconfig';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  return response.data;
};


const createCoupon = async (coupon: CouponInfo) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);
  return response.data;
};


const updateCoupon = async (coupon: CouponInfo) => {
  const response = await axios.put(`${base_url}coupon/${coupon._id}`,coupon, config);
  return response.data;
};


const getCoupon = async (id: string) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data;
};

const deleteCoupon = async (id: string) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};



const Couponservice = {
  getCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};
export default Couponservice;
