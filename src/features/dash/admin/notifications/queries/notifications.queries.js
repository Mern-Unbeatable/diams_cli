import { useQuery } from "@tanstack/react-query";
import { fetchNotifications, fetchNotification } from "../api/notifications.api";
import { notificationKeys } from "./notifications.keys";

export function useNotifications(filters = {}) {
  return useQuery({
    queryKey: notificationKeys.list(filters),
    queryFn: ({ signal }) => fetchNotifications(filters, { signal }),
  });
}

export function useNotification(id) {
  return useQuery({
    queryKey: notificationKeys.detail(id),
    queryFn: ({ signal }) => fetchNotification(id, { signal }),
    enabled: !!id,
  });
}
