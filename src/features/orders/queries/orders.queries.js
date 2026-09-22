/**
 * Why this file exists:
 * Read hooks for orders — the only place components should load order server state.
 */

import { useQuery } from "@tanstack/react-query";
import { fetchOrder, fetchOrders } from "../api/orders.api";
import { orderKeys } from "./orders.keys";

/**
 * List orders with optional filters.
 *
 * @param {Record<string, string | number | boolean | undefined>} [filters]
 */
export function useOrders(filters = {}) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: ({ signal }) => fetchOrders(filters, { signal }),
    // Orders change status often; shorter freshness than the global 60s default.
    staleTime: 30_000,
  });
}

/**
 * Single order by id. Skips the request until an id is present.
 *
 * @param {string | number | null | undefined} id
 */
export function useOrder(id) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: ({ signal }) => fetchOrder(id, { signal }),
    enabled: !!id,
  });
}
