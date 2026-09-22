/**
 * Axios interceptors — auth header, normalized errors, 401/403/429 feedback.
 */

import { getAccessToken } from "@/lib/auth/session";
import { notifyUnauthorized } from "@/lib/auth/unauthorized";
import { normalizeApiError } from "@/lib/api/errors";
import { toastError, toastWarning } from "@/lib/feedback/toast-bus";

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
      const info = normalizeApiError(error);
      error.normalized = info;

      if (info.status === 401) {
        notifyUnauthorized();
      } else if (info.status === 403) {
        toastError(info.message, "Access denied");
      } else if (info.status === 429) {
        toastWarning(info.message, "Slow down");
      }

      return Promise.reject(error);
    },
  );
}
