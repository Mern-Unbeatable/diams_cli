import { useMutation, useQueryClient } from "@tanstack/react-query";
import { billingKeys } from "./billing.keys";
import { createBilling, updateBilling } from "../api/billing.api";

export function useCreateBilling() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createBilling(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: billingKeys.lists() });
    },
  });
}

export function useUpdateBilling() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateBilling(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: billingKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: billingKeys.lists() });
    },
  });
}
