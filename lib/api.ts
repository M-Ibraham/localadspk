import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const user = Cookies.get("access_token");
    console.log("Token from interceptor:", user);
    config.headers.authorization = `Bearer ${user}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
