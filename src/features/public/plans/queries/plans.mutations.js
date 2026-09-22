import { useMutation, useQueryClient } from "@tanstack/react-query";
import { planKeys } from "./plans.keys";
import { createPlan, updatePlan, removePlan } from "../api/plans.api";

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createPlan(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updatePlan(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: planKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
    },
  });
}

export function useRemovePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => removePlan(id),
    onSettled: (_d, _e, id) => {
      queryClient.invalidateQueries({ queryKey: planKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
    },
  });
}
