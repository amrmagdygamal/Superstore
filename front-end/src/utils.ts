import { ApiError } from "./types/ApiErrors";
import { CartItem } from "./types/Cart";
import { ProductInfo } from "./types/ProductInfo";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

export const AddProductToCart = (product: ProductInfo): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    price: product.price,
    countInStock: product.countInStock,
    quantity: 1,
  }
  return cartItem
}