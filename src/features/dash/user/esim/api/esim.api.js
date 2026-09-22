import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { USER_ESIM_MOCK } from "../mocks/esim.mock";

export async function fetchUserEsim({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return USER_ESIM_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.esim.get, { signal });
  return data;
}
