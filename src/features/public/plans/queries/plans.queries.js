import { useQuery } from "@tanstack/react-query";
import { fetchPlans, fetchPlan } from "../api/plans.api";
import { planKeys } from "./plans.keys";

export function usePlans(filters = {}) {
  return useQuery({
    queryKey: planKeys.list(filters),
    queryFn: ({ signal }) => fetchPlans(filters, { signal }),
  });
}

export function usePlan(id) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: ({ signal }) => fetchPlan(id, { signal }),
    enabled: !!id,
  });
}
