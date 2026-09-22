/**
 * Plain HTTP for notifications — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { NOTIFICATIONS_MOCK } from "../mocks/notifications.mock";

export async function fetchNotifications(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(NOTIFICATIONS_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.notifications.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchNotification(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = findById(NOTIFICATIONS_MOCK, id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.notifications.detail(id), {
    signal,
  });
  return data;
}

export async function updateNotification(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.notifications.update(id), payload);
  return data;
}
