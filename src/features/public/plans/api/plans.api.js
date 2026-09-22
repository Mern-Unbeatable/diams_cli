/**
 * Plain HTTP for plans — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { PLANS_MOCK } from "../mocks/plans.mock";

const store = createMockStore(PLANS_MOCK);

export async function fetchPlans(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = store.list(filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.plans.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchPlan(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = store.get(id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.plans.detail(id), {
    signal,
  });
  return data;
}

export async function createPlan(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({ id: `plan-${Date.now()}`, ...payload });
  }
  const { data } = await apiClient.post(ENDPOINTS.plans.create, payload);
  return data;
}

export async function updatePlan(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.plans.update(id), payload);
  return data;
}

export async function removePlan(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.plans.remove(id));
  return data;
}
