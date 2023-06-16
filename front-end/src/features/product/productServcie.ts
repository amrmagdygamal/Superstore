import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// get all products

const getProducts = async (data: any) => {
  const response = await axios.get(
    `${base_url}pruducts?${data?.brand ? `brand=${data?.brand}&&` : ''}${
      data?.category ? `category=${data?.category}&&` : ''
    }${data?.tag ? `tag=${data?.tag}&&` : ''}${
      data?.color ? `color=${data?.color}&&` : ''
    }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ''}${
      data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ''
    }${data?.sort ? `sort=${data?.sort}&&` : ''}`
  );
  if (response.data) {
    return response.data;
  }
};

const getProduct = async (id: string) => {
  const response = await axios.get(`${base_url}pruducts/${id}/`);
  if (response.data) {
    return response.data;
  }
};

const addToWishList = async (id: string) => {
  const response = await axios.put(
    `${base_url}pruducts/wishlist/`,
    { prodId: id },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const deleteFromCart = async (id: string) => {
  const response = await axios.put(
    `${base_url}users/delete-from-cart/`,
    { prodId: id },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const rateProduct = async (data: any) => {
  const response = await axios.put(`${base_url}pruducts/rating/`, data, config);
  if (response.data) {
    return response.data;
  }
};

const productService = {
  getProducts,
  getProduct,
  addToWishList,
  rateProduct,
};

export default productService;
