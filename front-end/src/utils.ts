import { ApiError } from "./types/ApiErrors";
import { CartItem } from "./types/Cart";
import { ProductInfo } from "./types/ProductInfo";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

