import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCollaboratorCustomer,
  updateCollaboratorCustomer,
} from "../api/customers.api";
import { collabCustomerKeys } from "./customers.keys";

export function useCreateCollaboratorCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createCollaboratorCustomer(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: collabCustomerKeys.all });
    },
  });
}

export function useUpdateCollaboratorCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateCollaboratorCustomer(id, payload),
    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: collabCustomerKeys.all });
      if (vars?.id) {
        queryClient.invalidateQueries({
          queryKey: collabCustomerKeys.detail(vars.id),
        });
      }
    },
  });
}
