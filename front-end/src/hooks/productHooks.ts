import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { ProductInfo } from "../types/ProductInfo";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => (await apiClient.get<ProductInfo[]>(`/api/products`)).data
  })


  export const useGetProductDetailsBy_idQuery = (_id: string) =>
  useQuery({
    queryKey: ['products', _id],
    queryFn: async () =>
      (await apiClient.get<ProductInfo>(`/api/products/${_id}`)).data,
  })