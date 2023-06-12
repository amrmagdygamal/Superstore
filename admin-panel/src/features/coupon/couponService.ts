import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { CouponInfo } from './couponSlice';

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`);
  return response.data;
};


const createCoupon = async (coupon: CouponInfo) => {
  const response = await axios.post(`${base_url}coupon/`, coupon);
  return response.data;
};


const updateCoupon = async (coupon: CouponInfo) => {
  const response = await axios.put(`${base_url}coupons/${coupon._id}`, {
    name: coupon.couponData.name,
    expiry: coupon.couponData.expiry,
    discount: coupon.couponData.discount,
  });
  return response.data;
};


const getCoupon = async (id: string) => {
  const response = await axios.get(`${base_url}coupons/${id}`);
  return response.data;
};

const deleteCoupon = async (id: string) => {
  const response = await axios.delete(`${base_url}coupons/${id}`);
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
