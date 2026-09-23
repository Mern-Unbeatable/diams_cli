/**
 * Collaborator orders API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { COLLAB_ORDERS_MOCK } from "../mocks/orders.mock";

const store = createMockStore(COLLAB_ORDERS_MOCK);

function matchOrder(row, id) {
  return (
    String(row.id).toLowerCase() === String(id).toLowerCase() ||
    String(row.orderId || "").toLowerCase() === String(id).toLowerCase()
  );
}

export async function fetchCollaboratorOrders(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const status =
      filters.status && filters.status !== "All" ? filters.status : undefined;
    const data = store.list(status ? { status } : {});
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
    const row = store.get(id) || store.list().find((o) => matchOrder(o, id));
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(
    ENDPOINTS.collaborator.orders.detail(id),
    { signal },
  );
  return data;
}
