import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { USE_API_MOCKS, mockDelay } from "@/lib/api/mock";
import { createMockStore } from "@/lib/api/mock-store";
import {
  USER_FAQ_MOCK,
  USER_SUPPORT_TICKETS_MOCK,
} from "../mocks/support.mock";

const ticketStore = createMockStore(USER_SUPPORT_TICKETS_MOCK);

export async function fetchUserSupportTickets({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(140, signal);
    const data = ticketStore.list();
    return { data, total: data.length };
  }
  const { data } = await apiClient.get(ENDPOINTS.user.support.tickets, {
    signal,
  });
  return data;
}

export async function createUserSupportTicket(payload) {
  if (USE_API_MOCKS) {
    await mockDelay(200);
    return ticketStore.create({
      id: `NS-${Math.floor(10000 + Math.random() * 90000)}`,
      title: payload.subject || payload.title || "New ticket",
      category: payload.topic || payload.category || "Support",
      status: "In Progress",
      statusVariant: "blue",
      priority: "Medium",
      customer: "Sam Rivera",
      assignedAgent: "Support Team",
      updated: "Just now",
      date: "Today",
      description: payload.description || "",
      conversation: [
        {
          id: 1,
          sender: "Customer",
          text: payload.description || "",
        },
      ],
      ...payload,
    });
  }
  const { data } = await apiClient.post(
    ENDPOINTS.user.support.createTicket,
    payload,
  );
  return data;
}

export async function fetchUserFaq({ signal } = {}) {
  if (USE_API_MOCKS) {
    await mockDelay(120, signal);
    return USER_FAQ_MOCK;
  }
  const { data } = await apiClient.get(ENDPOINTS.user.support.faq, { signal });
  return data;
}
