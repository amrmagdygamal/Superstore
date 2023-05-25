import axios from "axios";
import { error } from "console";
import { config } from "process";

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/',

  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.request.use(async (config) => {
    if (localStorage.getItem('userInfo'))
    config.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')!).token
    }`
    return config
}, 
  (error) => {
    Promise.reject(error)
  })

export default apiClient;