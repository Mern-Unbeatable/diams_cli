import { useQuery } from "@tanstack/react-query";
import {
  fetchCollaboratorPlans,
  fetchCollaboratorPlan,
} from "../api/plans.api";
import { collabPlanKeys } from "./plans.keys";

export function useCollaboratorPlans(filters = {}) {
  return useQuery({
    queryKey: collabPlanKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorPlans(filters, { signal }),
  });
}

export function useCollaboratorPlan(id) {
  return useQuery({
    queryKey: collabPlanKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorPlan(id, { signal }),
    enabled: !!id,
  });
}
