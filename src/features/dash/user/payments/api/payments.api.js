import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { USER_PAYMENTS_MOCK } from "../mocks/payments.mock";

export async function fetchUserPayments({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return { data: USER_PAYMENTS_MOCK, total: USER_PAYMENTS_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.payments.list, {
    signal,
  });
  return data;
}

export async function createUserPayment(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id: "up-new", ...payload };
  }
  const { data } = await apiClient.post(
    ENDPOINTS.user.payments.create,
    payload,
  );
  return data;
}
