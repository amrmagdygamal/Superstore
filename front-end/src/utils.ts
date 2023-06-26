import { ApiError } from "./types/ApiErrors";

export const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}

