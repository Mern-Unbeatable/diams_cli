import { useQuery } from "@tanstack/react-query";
import {
  fetchCollaboratorTickets,
  fetchCollaboratorTicket,
} from "../api/support.api";
import { collabSupportKeys } from "./support.keys";

export function useCollaboratorTickets(filters = {}) {
  return useQuery({
    queryKey: collabSupportKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorTickets(filters, { signal }),
  });
}

export function useCollaboratorTicket(id) {
  return useQuery({
    queryKey: collabSupportKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorTicket(id, { signal }),
    enabled: !!id,
  });
}
