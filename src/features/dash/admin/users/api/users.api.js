/**
 * Plain HTTP for users — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { USERS_MOCK } from "../mocks/users.mock";

export async function fetchUsers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(USERS_MOCK, filters);
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
    await mockDelay(120, signal);
    const row = findById(USERS_MOCK, id);
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
    return { id: "use-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.users.create, payload);
  return data;
}

export async function updateUser(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.users.update(id), payload);
  return data;
}

export async function removeUser(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.users.remove(id));
  return data;
}
