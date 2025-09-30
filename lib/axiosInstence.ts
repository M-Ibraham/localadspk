import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: `http://localhost:5000/api`,
  timeout: 10000, // Optional: Timeout for requests
  headers: {
    "Content-Type": "application/json", // Optional: Default content type
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});
console.log(Cookies.get("access_token"));
export default axiosInstance;
