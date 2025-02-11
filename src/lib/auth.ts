import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "@privy-io/react-auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL no está configurado en el archivo .env");
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
     
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["x-prvy-auth"] = accessToken;
      config.headers["x-app-id"] = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
