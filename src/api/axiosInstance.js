import axios from "axios";
import { AUTH_STORAGE_KEY } from "@/config/dummyAuth";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

/**
 * Shared Axios instance — use this everywhere, not raw axios.
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        // When backend is ready, swap to real JWT field (e.g. session.token)
        const token = session?.token || session?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore invalid session
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Optional: clear session / redirect when API returns unauthorized
      // localStorage.removeItem(AUTH_STORAGE_KEY);
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
export { BASE_URL };
