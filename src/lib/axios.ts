import { getLocalStorage } from "@src/utils/storageUtils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_WHATSNEW_API_URL,
  timeout: 10000, // 10 seconds timeout
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getLocalStorage("@whats-new:accessToken");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
