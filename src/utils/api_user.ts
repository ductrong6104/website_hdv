
import axios from "axios";
import UserSession from "./user";
require("dotenv").config()
const baseURL = process.env.NEXT_PUBLIC_USER_SERVICE_API_BASE_URL 
// ? '' :"http://localhost:3000/user";
console.log(`url user service: ${baseURL}`)
const instance = axios.create({ baseURL: baseURL, timeout: 10000, headers: { 'Content-Type': 'application/json' } });

// const userSession = UserSession.getInstance();
// const user = userSession.getUser();
// // Thêm một request interceptor
// instance.interceptors.request.use(
//     (config) => {
//       const idUser = user;
//       if (!idUser) {
//         return Promise.reject(new Error('User is not authenticated'));
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
export default instance;