import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import {
  USER_MY_LINE_MOCK,
  USER_OVERVIEW_MOCK,
  USER_PROFILE_MOCK,
} from "../mocks/overview.mock";

export async function fetchUserOverview({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return USER_OVERVIEW_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.overview, { signal });
  return data;
}

export async function fetchUserMyLine({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return USER_MY_LINE_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.myLine, { signal });
  return data;
}

export async function fetchUserProfile({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return USER_PROFILE_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.profile.get, { signal });
  return data;
}

export async function updateUserProfile(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(180);
    return { ...USER_PROFILE_MOCK, ...payload };
  }
  const { data } = await apiClient.patch(
    ENDPOINTS.user.profile.update,
    payload,
  );
  return data;
}
