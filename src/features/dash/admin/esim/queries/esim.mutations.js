import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esimKeys } from "./esim.keys";
import { createEsim, updateEsim, removeEsim } from "../api/esim.api";

export function useCreateEsim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createEsim(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: esimKeys.lists() });
    },
  });
}

export function useUpdateEsim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateEsim(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: esimKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: esimKeys.lists() });
    },
  });
}

export function useRemoveEsim() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => removeEsim(id),
    onSettled: (_d, _e, id) => {
      queryClient.invalidateQueries({ queryKey: esimKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: esimKeys.lists() });
    },
  });
}
