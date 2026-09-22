import { useQuery } from "@tanstack/react-query";
import {
  fetchCollaboratorIdentityList,
  fetchCollaboratorIdentity,
} from "../api/identity.api";
import { collabIdentityKeys } from "./identity.keys";

export function useCollaboratorIdentityList(filters = {}) {
  return useQuery({
    queryKey: collabIdentityKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorIdentityList(filters, { signal }),
  });
}

export function useCollaboratorIdentity(id) {
  return useQuery({
    queryKey: collabIdentityKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorIdentity(id, { signal }),
    enabled: !!id,
  });
}
