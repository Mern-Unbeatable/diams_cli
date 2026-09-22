/**
 * Why this file exists:
 * Barrel for the HTTP layer (client + endpoints + error helper).
 */

export { default as apiClient, BASE_URL } from "./client";
export { default } from "./client";
export { ENDPOINTS } from "./endpoints";
export { getErrorMessage } from "./errors";
