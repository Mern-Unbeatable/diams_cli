import { useQuery } from "@tanstack/react-query";
import { fetchIdentityList, fetchIdentity } from "../api/identity.api";
import { identityKeys } from "./identity.keys";

export function useIdentityList(filters = {}) {
  return useQuery({
    queryKey: identityKeys.list(filters),
    queryFn: ({ signal }) => fetchIdentityList(filters, { signal }),
  });
}

export function useIdentity(id) {
  return useQuery({
    queryKey: identityKeys.detail(id),
    queryFn: ({ signal }) => fetchIdentity(id, { signal }),
    enabled: !!id,
  });
}
