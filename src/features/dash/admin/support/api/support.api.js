/**
 * Plain HTTP for support — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay, applyFilters, findById } from "@/lib/api/mock";
import { SUPPORT_MOCK } from "../mocks/support.mock";

export async function fetchTickets(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(180, signal);
    const data = applyFilters(SUPPORT_MOCK, filters);
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.support.list, {
    params: filters,
    signal,
  });
  return data;
}

export async function fetchTicket(id, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    const row = findById(SUPPORT_MOCK, id);
    if (!row) {
      const err = new Error("Not found");
      err.response = { status: 404 };
      throw err;
    }
    return row;
  }
  const { data } = await apiClient.get(ENDPOINTS.support.detail(id), {
    signal,
  });
  return data;
}

export async function createTicket(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id: "sup-new", ...payload };
  }
  const { data } = await apiClient.post(ENDPOINTS.support.create, payload);
  return data;
}

export async function updateTicket(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return { id, ...payload };
  }
  const { data } = await apiClient.patch(ENDPOINTS.support.update(id), payload);
  return data;
}

export async function removeTicket(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { id, deleted: true };
  }
  const { data } = await apiClient.delete(ENDPOINTS.support.remove(id));
  return data;
}

export async function replyTicket(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return { ticketId: id, ...payload, id: "reply-1" };
  }
  const { data } = await apiClient.post(ENDPOINTS.support.reply(id), payload);
  return data;
}
