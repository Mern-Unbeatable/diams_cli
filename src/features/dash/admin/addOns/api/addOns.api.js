/**
 * Plain HTTP for addOns — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { ADD_ONS_MOCK } from "../mocks/addOns.mock";

export async function fetchAddOns(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(ADD_ONS_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.addOns.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchAddOn(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = findById(ADD_ONS_MOCK, id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.addOns.detail(id), {
    signal,
  });
  return data;
}

export async function createAddOn(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id: "add-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.addOns.create, payload);
  return data;
}

export async function updateAddOn(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.addOns.update(id), payload);
  return data;
}

export async function removeAddOn(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.addOns.remove(id));
  return data;
}
