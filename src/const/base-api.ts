import axios from "axios";
import { clearTokens, getToken } from "../utils/action";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const baseApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

baseApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err);
    return Promise.reject(err);
  },
);

export const baseApiToken = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: { "Content-Type": "application/json" },
});

baseApiToken.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err),
);

baseApiToken.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      await clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/admin-showroom/login";
      }
    }

    return Promise.reject(err);
  },
);
