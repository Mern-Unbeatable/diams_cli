/**
 * Plain HTTP for billing — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { BILLING_MOCK } from "../mocks/billing.mock";

export async function fetchBillingList(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(BILLING_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.billing.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchBilling(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = findById(BILLING_MOCK, id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.billing.detail(id), {
    signal,
  });
  return data;
}

export async function createBilling(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id: "bil-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.billing.create, payload);
  return data;
}

export async function updateBilling(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.billing.update(id), payload);
  return data;
}
