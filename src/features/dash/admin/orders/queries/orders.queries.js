import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchOrder } from "../api/orders.api";
import { orderKeys } from "./orders.keys";

export function useOrders(filters = {}) {
  return useQuery({
    queryKey: orderKeys.list(filters),
    queryFn: ({ signal }) => fetchOrders(filters, { signal }),
    // Orders change status often; shorter freshness than the global 60s default.
    staleTime: 30_000,
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: ({ signal }) => fetchOrder(id, { signal }),
    enabled: !!id,
  });
}
