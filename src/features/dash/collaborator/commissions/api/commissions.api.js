import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { COLLAB_COMMISSIONS_MOCK } from "../mocks/commissions.mock";

const listStore = createMockStore(COLLAB_COMMISSIONS_MOCK.list);

export async function fetchCollaboratorCommissions({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    const list = listStore.list();
    return {
      summary: COLLAB_COMMISSIONS_MOCK.summary,
      list,
      data: list,
      total: list.length,
    };
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
