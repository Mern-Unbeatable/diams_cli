/**
 * Plain HTTP for customers — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { CUSTOMERS_MOCK } from "../mocks/customers.mock";

const store = createMockStore(CUSTOMERS_MOCK);

export async function fetchCustomers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const status = filters.status;
    const plan = filters.plan;
    const lineStatus = filters.lineStatus;
    const query = {};
    if (status && status !== "All") query.status = status;
    if (plan && plan !== "All") query.plan = plan;
    if (lineStatus && lineStatus !== "All") query.lineStatus = lineStatus;
    let data = store.list(query);
    if (filters.date?.trim()) {
      const date = filters.date.trim();
      data = data.filter((c) =>
        String(c.registrationDate || "").includes(date),
      );
    }
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.customers.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchCustomer(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (c) =>
          String(c.profileId || "").toLowerCase() === String(id).toLowerCase(),
      );
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.customers.detail(id), {
    signal,
  });
  return data;
}

export async function createCustomer(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `cust-${Date.now()}`,
      status: "Active",
      lineStatus: "Active",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.customers.create, payload);
  return data;
}

export async function updateCustomer(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.customers.update(id), payload);
  return data;
}

export async function removeCustomer(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.customers.remove(id));
  return data;
}
