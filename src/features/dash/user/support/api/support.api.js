import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import {
  USER_FAQ_MOCK,
  USER_SUPPORT_TICKETS_MOCK,
} from "../mocks/support.mock";

export async function fetchUserSupportTickets({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return {
      data: USER_SUPPORT_TICKETS_MOCK,
      total: USER_SUPPORT_TICKETS_MOCK.length,
    };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.support.tickets, {
    signal,
  });
  return data;
}

export async function fetchUserFaq({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return USER_FAQ_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.support.faq, { signal });
  return data;
}
