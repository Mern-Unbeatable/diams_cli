import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { USER_USAGE_MOCK } from "../mocks/usage.mock";

export async function fetchUserUsage({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return USER_USAGE_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.usage, { signal });
  return data;
}
