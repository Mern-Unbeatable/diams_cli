import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { USER_NOTIFICATIONS_MOCK } from "../mocks/notifications.mock";

export async function fetchUserNotifications({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return {
      data: USER_NOTIFICATIONS_MOCK,
      total: USER_NOTIFICATIONS_MOCK.length,
    };
  }
  const { data } = await apiClient.get(ENDPOINTS.notifications.list, {
    signal,
  });
  return data;
}
