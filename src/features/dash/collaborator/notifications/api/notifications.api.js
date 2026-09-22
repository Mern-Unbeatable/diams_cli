import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_NOTIFICATIONS_MOCK } from "../mocks/notifications.mock";

export async function fetchCollaboratorNotifications(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return { data: COLLAB_NOTIFICATIONS_MOCK, total: COLLAB_NOTIFICATIONS_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.notifications.list, { params: filters, signal });
  return data;
}

export async function fetchCollaboratorNotification(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return findById(COLLAB_NOTIFICATIONS_MOCK, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.notifications.detail(id), { signal });
  return data;
}
