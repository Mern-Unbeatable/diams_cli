import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_SUPPORT_MOCK } from "../mocks/support.mock";

export async function fetchCollaboratorTickets(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return { data: COLLAB_SUPPORT_MOCK, total: COLLAB_SUPPORT_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.support.list, { params: filters, signal });
  return data;
}

export async function fetchCollaboratorTicket(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return findById(COLLAB_SUPPORT_MOCK, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.support.detail(id), { signal });
  return data;
}
