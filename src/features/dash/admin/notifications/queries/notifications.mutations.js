import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationKeys } from "./notifications.keys";
import { updateNotification } from "../api/notifications.api";

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
