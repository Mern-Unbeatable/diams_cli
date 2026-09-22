/**
 * Single Axios client — base URL and shared HTTP defaults only.
 */

import axios from "axios";
import { env } from "@/lib/config/env";
import {
  attachAuthInterceptor,
  attachResponseInterceptor,
} from "./interceptors";

/**
 * Shared API client. Feature `*.api.js` files call this — not raw axios.
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

attachAuthInterceptor(apiClient);
attachResponseInterceptor(apiClient);
