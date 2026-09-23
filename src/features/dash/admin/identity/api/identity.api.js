/**
 * Plain HTTP for identity — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { IDENTITY_MOCK } from "../mocks/identity.mock";

const store = createMockStore(IDENTITY_MOCK);

export async function fetchIdentityList(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const status = filters.status;
    const data = store.list(
      status && status !== "All Statuses" ? { status } : {},
    );
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.identity.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchIdentity(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (item) =>
          String(item.verificationId || "").toLowerCase() ===
            String(id).toLowerCase() ||
          String(item.relatedOrder || "").toLowerCase() ===
            String(id).toLowerCase(),
      );
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.identity.detail(id), {
    signal,
  });
  return data;
}

export async function updateIdentity(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.identity.update(id), payload);
  return data;
}
