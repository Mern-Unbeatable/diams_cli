/**
 * Plain HTTP for orders — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { ORDERS_MOCK } from "../mocks/orders.mock";

const store = createMockStore(ORDERS_MOCK);

export async function fetchOrders(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    // Client-side status filter uses UI labels; map common keys.
    const status = filters.status;
    const data = store.list(
      status && status !== "All Statuses" ? { status } : {},
    );
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.orders.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchOrder(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (o) =>
          String(o.orderId).toLowerCase() === String(id).toLowerCase() ||
          String(o.orderDetailId || "").toLowerCase() === String(id).toLowerCase(),
      );
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.orders.detail(id), {
    signal,
  });
  return data;
}

export async function createOrder(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `ord-${Date.now()}`,
      orderId: `BK-${Date.now().toString().slice(-4)}`,
      status: "Pending",
      documents: [],
      internalNote: "",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.orders.create, payload);
  return data;
}

export async function updateOrder(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.orders.update(id), payload);
  return data;
}

export async function cancelOrder(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.orders.remove(id));
  return data;
}
