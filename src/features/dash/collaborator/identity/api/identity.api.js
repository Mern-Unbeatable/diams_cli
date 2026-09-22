import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_IDENTITY_MOCK } from "../mocks/identity.mock";

export async function fetchCollaboratorIdentityList(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return { data: COLLAB_IDENTITY_MOCK, total: COLLAB_IDENTITY_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.identity.list, { params: filters, signal });
  return data;
}

export async function fetchCollaboratorIdentity(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return findById(COLLAB_IDENTITY_MOCK, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.identity.detail(id), { signal });
  return data;
}
