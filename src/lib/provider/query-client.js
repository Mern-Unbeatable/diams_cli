/**
 * App-wide TanStack Query defaults — caching/retry tuned once for all features.
 */

import { QueryClient } from "@tanstack/react-query";

/**
 * @param {number} failureCount
 * @param {unknown} error
 */
const shouldRetry = (failureCount, error) => {
  const status = error?.response?.status;
  if (status === 401 || status === 403 || status === 404) {
    return false;
  }
  return failureCount < 2;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
    mutations: {
      retry: 0,
    },
  },
});
