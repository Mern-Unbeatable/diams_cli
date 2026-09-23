/**
 * App env — single place for Vite public env reads used by infrastructure.
 */

export const env = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  /** Demo mocks on unless explicitly disabled. */
  useApiMocks: import.meta.env.VITE_USE_API_MOCKS !== "false",
  /** Empty disables the Crisp chat widget entirely. */
  crispWebsiteId: import.meta.env.VITE_CRISP_WEBSITE_ID || "",
  isDev: import.meta.env.DEV,
};
