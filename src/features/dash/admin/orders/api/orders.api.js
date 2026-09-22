/**
 * Plain HTTP for orders — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { ORDERS_MOCK } from "../mocks/orders.mock";

export async function fetchOrders(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(ORDERS_MOCK, filters);
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
    await mockDelay(120, signal);
    const row = findById(ORDERS_MOCK, id);
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
    return { id: "ord-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.orders.create, payload);
  return data;
}

export async function updateOrder(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.orders.update(id), payload);
  return data;
}

export async function cancelOrder(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.orders.remove(id));
  return data;
}
