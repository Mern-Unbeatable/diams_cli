/**
 * Demo/mock mode helpers for feature APIs until a real backend is available.
 * Set VITE_USE_API_MOCKS=false to hit the network via apiClient.
 */

import { env } from "@/lib/config/env";

/** @type {boolean} */
export const USE_API_MOCKS = env.useApiMocks;

/**
 * Abort-aware delay for mock latency.
 * @param {number} [ms]
 * @param {AbortSignal} [signal]
 */
export function mockDelay(ms = 180, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      return;
    }

    const timer = setTimeout(resolve, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/**
 * Filter a list by simple equality on filter keys (demo helper).
 * @template T
 * @param {T[]} items
 * @param {Record<string, unknown>} [filters]
 * @returns {T[]}
 */
export function applyFilters(items, filters = {}) {
  const entries = Object.entries(filters).filter(
    ([, value]) => value !== undefined && value !== "" && value !== "all",
  );
  if (!entries.length) return items;

  return items.filter((item) =>
    entries.every(([key, value]) => {
      const current = item?.[key];
      if (current == null) return false;
      return String(current).toLowerCase() === String(value).toLowerCase();
    }),
  );
}

/**
 * @template T
 * @param {T[]} items
 * @param {string | number} id
 * @param {string} [idKey]
 * @returns {T | undefined}
 */
export function findById(items, id, idKey = "id") {
  return items.find((item) => String(item?.[idKey]) === String(id));
}
