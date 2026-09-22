import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { USER_BILLS_MOCK } from "../mocks/bills.mock";

export async function fetchUserBills({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    return { data: USER_BILLS_MOCK, total: USER_BILLS_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.bills.list, { signal });
  return data;
}

export async function fetchUserBill(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return findById(USER_BILLS_MOCK, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.user.bills.detail(id), {
    signal,
  });
  return data;
}
