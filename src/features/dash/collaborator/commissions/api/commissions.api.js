import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { COLLAB_COMMISSIONS_MOCK } from "../mocks/commissions.mock";

export async function fetchCollaboratorCommissions({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return COLLAB_COMMISSIONS_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.commissions.list, {
    signal,
  });
  return data;
}

export async function fetchCollaboratorCommissionSummary({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(100, signal);
    return COLLAB_COMMISSIONS_MOCK.summary;
  }
  const { data } = await apiClient.get(
    ENDPOINTS.collaborator.commissions.summary,
    { signal },
  );
  return data;
}
