/**
 * Collaborator customers API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { COLLAB_CUSTOMERS_MOCK } from "../mocks/customers.mock";

const store = createMockStore(COLLAB_CUSTOMERS_MOCK);

function matchCustomer(row, id) {
  return (
    String(row.id).toLowerCase() === String(id).toLowerCase() ||
    String(row.profileId || "").toLowerCase() === String(id).toLowerCase()
  );
}

export async function fetchCollaboratorCustomers(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const status =
      filters.status && filters.status !== "All" ? filters.status : undefined;
    const plan =
      filters.plan && filters.plan !== "All" ? filters.plan : undefined;
    const data = store.list({
      ...(status ? { status } : {}),
      ...(plan ? { plan } : {}),
    });
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
    const row = store.get(id) || store.list().find((c) => matchCustomer(c, id));
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(
    ENDPOINTS.collaborator.customers.detail(id),
    { signal },
  );
  return data;
}

export async function createCollaboratorCustomer(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `cust-${Date.now()}`,
      profileId: `C-${Date.now().toString().slice(-4)}`,
      status: "Active",
      lineStatus: "Active",
      ...payload,
    });
  }
  const { data } = await apiClient.post(
    ENDPOINTS.collaborator.customers.list,
    payload,
  );
  return data;
}

export async function updateCollaboratorCustomer(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    const existing =
      store.get(id) || store.list().find((c) => matchCustomer(c, id));
    if (!existing) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return store.update(existing.id, payload);
  }
  const { data } = await apiClient.patch(
    ENDPOINTS.collaborator.customers.detail(id),
    payload,
  );
  return data;
}
