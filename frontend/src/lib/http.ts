import axios from "axios";
import type { AxiosStatic } from "axios";

export const setHeader = (
  axiosInstance: AxiosStatic,
  key: string,
  value: string,
) => {
  axiosInstance.defaults.headers.common[key] = value;
};

export const setToken = (
  axiosInstance: AxiosStatic,
  token?: string | null,
  type?: string,
) => {
  if (!type) {
    if (!token) return;
    axiosInstance.defaults.headers.common.authorization = token;
    return;
  }

  switch (type) {
    case "Bearer":
      axiosInstance.defaults.headers.common.authorization = `Bearer ${token}`;
      break;
    default:
      break;
  }
};

export const setBaseUrl = (axiosInstance: AxiosStatic, url: string) => {
  axiosInstance.defaults.baseURL = url;
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
});

export const $axios = axios;
export const $axiosInstance = axiosInstance;
