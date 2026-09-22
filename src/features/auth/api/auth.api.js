/**
 * Auth HTTP helpers — mock-first until real auth endpoints are live.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { AUTH_LOGIN_MOCK, AUTH_ME_MOCK } from "../mocks/auth.mock";

export async function loginRequest(payload) {
  if (USE_API_MOCKS) {
    await mockDelay();
    return {
      ...AUTH_LOGIN_MOCK,
      user: { ...AUTH_ME_MOCK, email: payload?.email ?? AUTH_ME_MOCK.email },
    };
  }
  const { data } = await apiClient.post(ENDPOINTS.auth.login, payload);
  return data;
}

export async function fetchMe({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return AUTH_ME_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.auth.me, { signal });
  return data;
}

export async function logoutRequest() {
  if (USE_API_MOCKS) {
    await mockDelay(80);
    return { ok: true };
  }
  const { data } = await apiClient.post(ENDPOINTS.auth.logout);
  return data;
}
