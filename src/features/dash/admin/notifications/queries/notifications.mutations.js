import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notifications.keys";
import {
  createNotification,
  updateNotification,
} from "../api/notifications.api";

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => createNotification(payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
}

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => updateNotification(id, payload),
    onSettled: (_d, _e, v) => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.detail(v.id) });
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
}
