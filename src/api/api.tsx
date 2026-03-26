import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL + "/api",
  timeout: 40000,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? "";
  const isAuthCall = url.includes("/auth");
  const isAuthCallCode = url.includes("/auth/code");
  if (accessToken && !isAuthCall && !isAuthCallCode) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default api;
