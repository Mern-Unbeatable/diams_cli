/**
 * Plain HTTP for support — mock-first via USE_API_MOCKS.
 */
import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import { SUPPORT_MOCK } from "../mocks/support.mock";

const store = createMockStore(SUPPORT_MOCK);

export async function fetchTickets(filters = {}, { signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(280, signal);
    const query = {};
    if (filters.priority && filters.priority !== "All Priority") {
      query.priority = filters.priority;
    }
    if (filters.status && filters.status !== "All Statuses") {
      query.status = filters.status;
    }
    const data = store.list(query);
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
    await mockDelay(160, signal);
    const row =
      store.get(id) ||
      store.list().find(
        (t) =>
          String(t.ticketId || "").toLowerCase() === String(id).toLowerCase() ||
          String(t.customer || "")
            .toLowerCase()
            .replace(/\s+/g, "-") === String(id).toLowerCase(),
      );
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
    return store.create({
      id: `tck-${Date.now()}`,
      ticketId: `TCK-${Date.now().toString().slice(-4)}`,
      status: "Open",
      priority: "Medium",
      ...payload,
    });
  }
  const { data } = await apiClient.post(ENDPOINTS.support.create, payload);
  return data;
}

export async function updateTicket(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return store.update(id, payload);
  }
  const { data } = await apiClient.patch(ENDPOINTS.support.update(id), payload);
  return data;
}

export async function removeTicket(id) {
  if (USE_API_MOCKS) {
    await mockDelay(160);
    return store.remove(id);
  }
  const { data } = await apiClient.delete(ENDPOINTS.support.remove(id));
  return data;
}

export async function replyTicket(id, payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    const ticket = store.get(id);
    return {
      ticketId: id,
      ...payload,
      id: `reply-${Date.now()}`,
      ticket,
    };
  }
  const { data } = await apiClient.post(ENDPOINTS.support.reply(id), payload);
  return data;
}
