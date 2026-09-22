/**
 * Why this file exists:
 * Single Axios client — base URL, auth header, and shared HTTP defaults only.
 */

import axios from "axios";
import { AUTH_STORAGE_KEY } from "@/config/dummyAuth";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * Shared API client. Feature `*.api.js` files call this — not raw axios.
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        // Demo auth has no JWT yet; attach when session gains token/accessToken.
        const token = session?.token || session?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore invalid session JSON
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 redirect/logout is a follow-up once real auth tokens exist.
    return Promise.reject(error);
  },
);
