import { useQuery } from "@tanstack/react-query";
import { fetchUserNotifications } from "../api/notifications.api";
import { userNotificationKeys } from "./notifications.keys";

export function useUserNotifications() {
  return useQuery({
    queryKey: userNotificationKeys.list(),
    queryFn: ({ signal }) => fetchUserNotifications({ signal }),
  });
}
