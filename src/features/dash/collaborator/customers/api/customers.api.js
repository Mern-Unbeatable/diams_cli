/**
 * Collaborator customers API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_CUSTOMERS_MOCK } from "../mocks/customers.mock";

export async function fetchCollaboratorCustomers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const data = Array.isArray(COLLAB_CUSTOMERS_MOCK) ? COLLAB_CUSTOMERS_MOCK : COLLAB_CUSTOMERS_MOCK.list ?? COLLAB_CUSTOMERS_MOCK;
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.customers.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchCollaboratorCustomer(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const rows = Array.isArray(COLLAB_CUSTOMERS_MOCK) ? COLLAB_CUSTOMERS_MOCK : COLLAB_CUSTOMERS_MOCK.list ?? [];
    return findById(rows, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.customers.detail(id), { signal });
  return data;
}
