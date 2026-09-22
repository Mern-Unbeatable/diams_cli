/**
 * Collaborator activations API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_ACTIVATIONS_MOCK } from "../mocks/activations.mock";

export async function fetchCollaboratorActivations(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const data = Array.isArray(COLLAB_ACTIVATIONS_MOCK) ? COLLAB_ACTIVATIONS_MOCK : COLLAB_ACTIVATIONS_MOCK.list ?? COLLAB_ACTIVATIONS_MOCK;
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
    const rows = Array.isArray(COLLAB_ACTIVATIONS_MOCK) ? COLLAB_ACTIVATIONS_MOCK : COLLAB_ACTIVATIONS_MOCK.list ?? [];
    return findById(rows, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.activations.detail(id), { signal });
  return data;
}
