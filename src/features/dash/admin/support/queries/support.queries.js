import { useQuery } from "@tanstack/react-query";
import { fetchTickets, fetchTicket } from "../api/support.api";
import { supportKeys } from "./support.keys";

export function useTickets(filters = {}) {
  return useQuery({
    queryKey: supportKeys.list(filters),
    queryFn: ({ signal }) => fetchTickets(filters, { signal }),
  });
}

export function useTicket(id) {
  return useQuery({
    queryKey: supportKeys.detail(id),
    queryFn: ({ signal }) => fetchTicket(id, { signal }),
    enabled: !!id,
  });
}
