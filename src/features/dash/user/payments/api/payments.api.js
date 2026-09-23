import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { USER_PAYMENTS_MOCK } from "../mocks/payments.mock";

const store = createMockStore(USER_PAYMENTS_MOCK);

export async function fetchUserPayments({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    const data = store.list();
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.payments.list, {
    signal,
  });
  return data;
}

export async function createUserPayment(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.create({
      id: `TXN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Successful",
      ...payload,
    });
  }
  const { data } = await apiClient.post(
    ENDPOINTS.user.payments.create,
    payload,
  );
  return data;
}
