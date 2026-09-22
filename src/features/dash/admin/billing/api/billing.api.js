/**
 * Plain HTTP for billing — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { BILLING_MOCK } from "../mocks/billing.mock";

const store = createMockStore(BILLING_MOCK);

export async function fetchBillingList(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const status = filters.status;
    const data = store.list(
      status && status !== "All Statuses" ? { status } : {},
    );
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
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (b) =>
          String(b.invoiceId || "").toLowerCase() === String(id).toLowerCase(),
      );
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
    return store.create({
      id: `inv-${Date.now()}`,
      invoiceId: `INV-${Date.now().toString().slice(-4)}`,
      status: "Unpaid",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.billing.create, payload);
  return data;
}

export async function updateBilling(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.billing.update(id), payload);
  return data;
}
