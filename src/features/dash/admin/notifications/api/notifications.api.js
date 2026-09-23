/**
 * Plain HTTP for notifications — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { NOTIFICATIONS_MOCK } from "../mocks/notifications.mock";

const store = createMockStore(NOTIFICATIONS_MOCK);

export async function fetchNotifications(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const type = filters.type;
    const data = store.list(
      type && type !== "All Types" ? { type } : {},
    );
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
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (n) =>
          String(n.ntfId || "").toLowerCase() === String(id).toLowerCase(),
      );
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

export async function createNotification(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `ntf-${Date.now()}`,
      ntfId: `NTF-${Date.now().toString().slice(-4)}`,
      status: "Sent",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.notifications.list, payload);
  return data;
}

export async function updateNotification(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(
    ENDPOINTS.notifications.update(id),
    payload,
  );
  return data;
}
