import { useQuery } from "@tanstack/react-query";
import { fetchCollaboratorOrders, fetchCollaboratorOrder } from "../api/orders.api";
import { collabOrderKeys } from "./orders.keys";

export function useCollaboratorOrders(filters = {}) {
  return useQuery({
    queryKey: collabOrderKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorOrders(filters, { signal }),
  });
}

export function useCollaboratorOrder(id) {
  return useQuery({
    queryKey: collabOrderKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorOrder(id, { signal }),
    enabled: !!id,
  });
}
