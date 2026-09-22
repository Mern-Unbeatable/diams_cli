/**
 * Plain HTTP for esim — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { ESIM_MOCK } from "../mocks/esim.mock";

export async function fetchEsims(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(ESIM_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.esim.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchEsim(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = findById(ESIM_MOCK, id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.esim.detail(id), {
    signal,
  });
  return data;
}

export async function createEsim(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id: "esi-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.esim.create, payload);
  return data;
}

export async function updateEsim(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.esim.update(id), payload);
  return data;
}

export async function removeEsim(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.esim.remove(id));
  return data;
}
