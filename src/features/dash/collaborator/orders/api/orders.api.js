/**
 * Collaborator orders API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_ORDERS_MOCK } from "../mocks/orders.mock";

export async function fetchCollaboratorOrders(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const data = Array.isArray(COLLAB_ORDERS_MOCK) ? COLLAB_ORDERS_MOCK : COLLAB_ORDERS_MOCK.list ?? COLLAB_ORDERS_MOCK;
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.orders.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchCollaboratorOrder(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const rows = Array.isArray(COLLAB_ORDERS_MOCK) ? COLLAB_ORDERS_MOCK : COLLAB_ORDERS_MOCK.list ?? [];
    return findById(rows, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.orders.detail(id), { signal });
  return data;
}
