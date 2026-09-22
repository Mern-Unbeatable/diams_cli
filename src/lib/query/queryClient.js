/**
 * Why this file exists:
 * App-wide TanStack Query defaults — caching/retry tuned once for all features.
 */

import { QueryClient } from "@tanstack/react-query";

/**
 * @param {number} failureCount
 * @param {unknown} error
 */
const shouldRetry = (failureCount, error) => {
  const status = error?.response?.status;
  // Auth and missing resources will not succeed on retry.
  if (status === 401 || status === 403 || status === 404) {
    return false;
  }
  // Two retries covers brief network blips without delaying hard failures.
  return failureCount < 2;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Dashboard screens tolerate 1 minute of freshness; override per-domain when needed.
      staleTime: 60_000,
      // Keep inactive cache briefly so back-navigation is instant without unbounded memory growth.
      gcTime: 5 * 60_000,
      // Multi-tab admin demos caused noisy duplicate traffic; features can opt into focus refetch.
      refetchOnWindowFocus: false,
      retry: shouldRetry,
    },
    mutations: {
      // User-initiated writes must not auto-retry (risk of double submit).
      retry: 0,
    },
  },
});

export default queryClient;
