/**
 * Plain HTTP for users — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { USERS_MOCK } from "../mocks/users.mock";

const store = createMockStore(USERS_MOCK);

export async function fetchUsers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const data = store.list(filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.users.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchUser(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const row = store.get(id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.users.detail(id), {
    signal,
  });
  return data;
}

export async function createUser(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `usr-${Date.now()}`,
      status: "Active",
      access: "Overview",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.users.create, payload);
  return data;
}

export async function updateUser(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.users.update(id), payload);
  return data;
}

export async function removeUser(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.users.remove(id));
  return data;
}
