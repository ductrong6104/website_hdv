
import axios from "axios";
require("dotenv").config()
const baseURL = process.env.NEXT_PUBLIC_USER_SERVICE_API_BASE_URL 
// ? '' :"http://localhost:3000/user";
console.log(`url user service: ${baseURL}`)
const instance = axios.create({ baseURL: baseURL, timeout: 10000, headers: { 'Content-Type': 'application/json' } });



export default instance;