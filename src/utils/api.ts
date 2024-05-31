
import axios from "axios";
require("dotenv").config()
const baseURL = process.env.NEXT_PUBLIC_HOTEL_SERVICE_API_BASE_URL 
// ? '' :"http://localhost:8080/hotel-service";
console.log(baseURL)
const instance = axios.create({ baseURL: baseURL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });

// instance.interceptors.request.use((config) => {
//     const token = getCookie("ACCESS_TOKEN");
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;   
// });

// instance.interceptors.request.use(
//     (res) => res,
//     (e) => {
//         const message = e.response.data.message || "Contains a few errors";
//         toast.error(message);
//         return Promise.reject(message);
//     }
// );

export default instance;