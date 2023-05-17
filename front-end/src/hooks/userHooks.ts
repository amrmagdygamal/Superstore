
import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserInfo } from "../types/UserInfo";



export const userSigninMutation = () => 
useMutation({
  mutationFn: async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => (
    await apiClient.post<UserInfo>(`api/users/login`, {
      
      email, 
      password,
    })
  ).data,
})

export const userSignUpMutation = () => 
useMutation({
  mutationFn: async ({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) => (
    await apiClient.post<UserInfo>(`api/users/signup`, {
      username,
      email, 
      password,
    })
  ).data,
})

