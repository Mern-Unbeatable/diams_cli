import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_PLANS_MOCK } from "../mocks/plans.mock";

export async function fetchCollaboratorPlans(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return { data: COLLAB_PLANS_MOCK, total: COLLAB_PLANS_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.plans.list, { params: filters, signal });
  return data;
}

export async function fetchCollaboratorPlan(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return findById(COLLAB_PLANS_MOCK, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.plans.detail(id), { signal });
  return data;
}
