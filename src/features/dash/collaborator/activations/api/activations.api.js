/**
 * Collaborator activations API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { COLLAB_ACTIVATIONS_MOCK } from "../mocks/activations.mock";

const store = createMockStore(COLLAB_ACTIVATIONS_MOCK);

function matchActivation(row, id) {
  return (
    String(row.id).toLowerCase() === String(id).toLowerCase() ||
    String(row.activationId || "").toLowerCase() === String(id).toLowerCase()
  );
}

export async function fetchCollaboratorActivations(
  filters = {},
  { signal } = {},
) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const status =
      filters.status && filters.status !== "All" ? filters.status : undefined;
    const data = store.list(status ? { status } : {});
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.activations.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchCollaboratorActivation(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row =
      store.get(id) || store.list().find((a) => matchActivation(a, id));
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(
    ENDPOINTS.collaborator.activations.detail(id),
    { signal },
  );
  return data;
}

export async function updateCollaboratorActivation(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    const existing =
      store.get(id) || store.list().find((a) => matchActivation(a, id));
    if (!existing) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return store.update(existing.id, payload);
  }
  const { data } = await apiClient.patch(
    ENDPOINTS.collaborator.activations.detail(id),
    payload,
  );
  return data;
}
