
import axios from "axios";
require("dotenv").config()
const baseURL = process.env.NEXT_PUBLIC_HOTEL_SERVICE_API_BASE_URL 
// ? '' :"http://localhost:8080/hotel-service";
console.log(baseURL)
const instance = axios.create({ baseURL: baseURL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });

// Thêm interceptor để thêm token vào mỗi yêu cầu
// instance.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('accessToken');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default instance;