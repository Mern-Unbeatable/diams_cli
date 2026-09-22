import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customerKeys } from "./customers.keys";
import { createCustomer, updateCustomer, removeCustomer } from "../api/customers.api";

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createCustomer(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCustomer(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}

export function useRemoveCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => removeCustomer(id),
    onSettled: (_d, _e, id) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}
