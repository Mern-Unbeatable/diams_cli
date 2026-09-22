/**
 * Plain HTTP for auditLogs — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters } from "@/lib/api/mock";
import { AUDIT_LOGS_MOCK } from "../mocks/auditLogs.mock";

export async function fetchAuditLogs(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(AUDIT_LOGS_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.auditLogs.list, {
    params: filters,
    signal,
  });
  return data;
}
