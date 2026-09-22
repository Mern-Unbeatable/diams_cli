/**
 * Plain HTTP for settings — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { SETTINGS_MOCK } from "../mocks/settings.mock";

export async function fetchSettings({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return SETTINGS_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.settings.get, { signal });
  return data;
}

export async function updateSettings(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(180);
    return { ...SETTINGS_MOCK, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.settings.update, payload);
  return data;
}
