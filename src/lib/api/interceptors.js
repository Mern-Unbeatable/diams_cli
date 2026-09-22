/**
 * Axios interceptors — auth header attach; 401 handling reserved for real JWT.
 */

import { getAccessToken } from "@/lib/auth/session";

/**
 * @param {import("axios").AxiosInstance} client
 */
export function attachAuthInterceptor(client) {
  client.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );
}

/**
 * @param {import("axios").AxiosInstance} client
 */
export function attachResponseInterceptor(client) {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // 401 redirect/logout is a follow-up once real auth tokens exist.
      return Promise.reject(error);
    },
  );
}
