import { useQuery } from "@tanstack/react-query";
import { fetchCollaboratorActivations, fetchCollaboratorActivation } from "../api/activations.api";
import { collabActivationKeys } from "./activations.keys";

export function useCollaboratorActivations(filters = {}) {
  return useQuery({
    queryKey: collabActivationKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorActivations(filters, { signal }),
  });
}

export function useCollaboratorActivation(id) {
  return useQuery({
    queryKey: collabActivationKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorActivation(id, { signal }),
    enabled: !!id,
  });
}
