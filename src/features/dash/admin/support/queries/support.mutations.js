import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supportKeys } from "./support.keys";
import { createTicket, updateTicket, removeTicket, replyTicket } from "../api/support.api";

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createTicket(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: supportKeys.lists() });
    },
  });
}

export function useUpdateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateTicket(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.lists() });
    },
  });
}

export function useRemoveTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => removeTicket(id),
    onSettled: (_d, _e, id) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: supportKeys.lists() });
    },
  });
}

export function useReplyTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => replyTicket(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: supportKeys.detail(v.id) });
    },
  });
}
