/**
 * Collaborator invoices API (mock-first).
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { COLLAB_INVOICES_MOCK } from "../mocks/invoices.mock";

const store = createMockStore(COLLAB_INVOICES_MOCK);

function matchInvoice(row, id) {
  return (
    String(row.id).toLowerCase() === String(id).toLowerCase() ||
    String(row.invoiceId || "").toLowerCase() === String(id).toLowerCase()
  );
}

export async function fetchCollaboratorInvoices(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(160, signal);
    const data = store.list(filters);
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
    const row =
      store.get(id) || store.list().find((inv) => matchInvoice(inv, id));
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(
    ENDPOINTS.collaborator.invoices.detail(id),
    { signal },
  );
  return data;
}
