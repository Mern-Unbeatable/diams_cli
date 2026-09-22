/**
 * Collaborator invoices API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, findById } from "@/lib/api/mock";
import { COLLAB_INVOICES_MOCK } from "../mocks/invoices.mock";

export async function fetchCollaboratorInvoices(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const data = Array.isArray(COLLAB_INVOICES_MOCK) ? COLLAB_INVOICES_MOCK : COLLAB_INVOICES_MOCK.list ?? COLLAB_INVOICES_MOCK;
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.invoices.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchCollaboratorInvoice(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const rows = Array.isArray(COLLAB_INVOICES_MOCK) ? COLLAB_INVOICES_MOCK : COLLAB_INVOICES_MOCK.list ?? [];
    return findById(rows, id);
  }
  const { data } = await apiClient.get(ENDPOINTS.collaborator.invoices.detail(id), { signal });
  return data;
}
