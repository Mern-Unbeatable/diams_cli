/**
 * Plain HTTP for esim — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { ESIM_MOCK } from "../mocks/esim.mock";

const store = createMockStore(ESIM_MOCK);

export async function fetchEsims(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const status = filters.status;
    let data = store.list();
    if (status && status !== "All Statuses") {
      const needle = String(status).toLowerCase();
      data = data.filter(
        (p) =>
          String(p.esimStatus || "").toLowerCase() === needle ||
          String(p.qrStatus || "").toLowerCase() === needle,
      );
    }
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
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (p) =>
          String(p.customer || "")
            .toLowerCase()
            .replace(/\s+/g, "-") === String(id).toLowerCase(),
      );
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
    return store.create({
      id: `esim-${Date.now()}`,
      esimStatus: "Pending",
      qrStatus: "Pending",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.esim.create, payload);
  return data;
}

export async function updateEsim(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.esim.update(id), payload);
  return data;
}

export async function removeEsim(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.esim.remove(id));
  return data;
}
