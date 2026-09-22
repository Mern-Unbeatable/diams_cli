import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOnKeys } from "./addOns.keys";
import { createAddOn, updateAddOn, removeAddOn } from "../api/addOns.api";

export function useCreateAddOn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createAddOn(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: addOnKeys.lists() });
    },
  });
}

export function useUpdateAddOn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateAddOn(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: addOnKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: addOnKeys.lists() });
    },
  });
}

export function useRemoveAddOn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => removeAddOn(id),
    onSettled: (_d, _e, id) => {
      queryClient.invalidateQueries({ queryKey: addOnKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: addOnKeys.lists() });
    },
  });
}
