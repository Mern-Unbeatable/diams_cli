import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUser } from "../api/users.api";
import { userKeys } from "./users.keys";

export function useUsers(filters = {}) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: ({ signal }) => fetchUsers(filters, { signal }),
  });
}

export function useUser(id) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: ({ signal }) => fetchUser(id, { signal }),
    enabled: !!id,
  });
}
