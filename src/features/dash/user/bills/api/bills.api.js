import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { USER_BILLS_MOCK } from "../mocks/bills.mock";

const store = createMockStore(USER_BILLS_MOCK);

export async function fetchUserBills({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    const data = store.list();
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.bills.list, { signal });
  return data;
}

export async function fetchUserBill(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = store.get(id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.bills.detail(id), {
    signal,
  });
  return data;
}
