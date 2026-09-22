import { useQuery } from "@tanstack/react-query";
import {
  fetchCollaboratorNotifications,
  fetchCollaboratorNotification,
} from "../api/notifications.api";
import { collabNotificationKeys } from "./notifications.keys";

export function useCollaboratorNotifications(filters = {}) {
  return useQuery({
    queryKey: collabNotificationKeys.list(filters),
    queryFn: ({ signal }) => fetchCollaboratorNotifications(filters, { signal }),
  });
}

export function useCollaboratorNotification(id) {
  return useQuery({
    queryKey: collabNotificationKeys.detail(id),
    queryFn: ({ signal }) => fetchCollaboratorNotification(id, { signal }),
    enabled: !!id,
  });
}
