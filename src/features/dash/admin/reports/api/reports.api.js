/**
 * Plain HTTP for reports — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { REPORTS_LIST_MOCK, REPORTS_OVERVIEW_MOCK } from "../mocks/reports.mock";

export async function fetchReportsOverview({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return REPORTS_OVERVIEW_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.reports.overview, { signal });
  return data;
}

export async function fetchReports(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(150, signal);
    return { data: REPORTS_LIST_MOCK, total: REPORTS_LIST_MOCK.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.reports.list, {
    params: filters,
    signal,
  });
  return data;
}
