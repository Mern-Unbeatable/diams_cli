/**
 * Plain HTTP for auditLogs — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { AUDIT_LOGS_MOCK } from "../mocks/auditLogs.mock";

const store = createMockStore(AUDIT_LOGS_MOCK);

export async function fetchAuditLogs(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const query = {};
    if (filters.admin && filters.admin !== "All") query.admin = filters.admin;
    if (filters.module && filters.module !== "All") query.module = filters.module;
    if (filters.action && filters.action !== "All") query.action = filters.action;
    let data = store.list(query);
    if (filters.dateRange?.trim()) {
      const dateRange = filters.dateRange.trim();
      data = data.filter((log) =>
        String(log.dateTime || "").includes(dateRange),
      );
    }
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.auditLogs.list, {
    params: filters,
    signal,
  });
  return data;
}
