/**
 * Plain HTTP for customers — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { CUSTOMERS_MOCK } from "../mocks/customers.mock";

export async function fetchCustomers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(CUSTOMERS_MOCK, filters);
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
    await mockDelay(120, signal);
    const row = findById(CUSTOMERS_MOCK, id);
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
    return { id: "cus-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.customers.create, payload);
  return data;
}

export async function updateCustomer(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.customers.update(id), payload);
  return data;
}

export async function removeCustomer(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.customers.remove(id));
  return data;
}
