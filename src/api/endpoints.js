/**
 * Central API endpoint map.
 * Change paths here only — CRUD helpers & hooks stay readable.
 *
 * Usage:
 *   import { ENDPOINTS } from "@/api/endpoints";
 *   apiGet(ENDPOINTS.customers.list)
 */

export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    refresh: "/auth/refresh",
  },

  // ─── Admin ───────────────────────────────────────────────
  customers: {
    list: "/customers",
    detail: (id) => `/customers/${id}`,
    create: "/customers",
    update: (id) => `/customers/${id}`,
    remove: (id) => `/customers/${id}`,
  },

  orders: {
    list: "/orders",
    detail: (id) => `/orders/${id}`,
    create: "/orders",
    update: (id) => `/orders/${id}`,
    remove: (id) => `/orders/${id}`,
  },

  identity: {
    list: "/identity-verifications",
    detail: (id) => `/identity-verifications/${id}`,
    update: (id) => `/identity-verifications/${id}`,
  },

  plans: {
    list: "/plans",
    detail: (id) => `/plans/${id}`,
    create: "/plans",
    update: (id) => `/plans/${id}`,
    remove: (id) => `/plans/${id}`,
  },

  addOns: {
    list: "/add-ons",
    detail: (id) => `/add-ons/${id}`,
    create: "/add-ons",
    update: (id) => `/add-ons/${id}`,
    remove: (id) => `/add-ons/${id}`,
  },

  esim: {
    list: "/esims",
    detail: (id) => `/esims/${id}`,
    create: "/esims",
    update: (id) => `/esims/${id}`,
    remove: (id) => `/esims/${id}`,
  },

  billing: {
    list: "/billing",
    detail: (id) => `/billing/${id}`,
    create: "/billing",
    update: (id) => `/billing/${id}`,
  },

  support: {
    list: "/support/tickets",
    detail: (id) => `/support/tickets/${id}`,
    create: "/support/tickets",
    update: (id) => `/support/tickets/${id}`,
    remove: (id) => `/support/tickets/${id}`,
    reply: (id) => `/support/tickets/${id}/replies`,
  },

  notifications: {
    list: "/notifications",
    detail: (id) => `/notifications/${id}`,
    update: (id) => `/notifications/${id}`,
  },

  users: {
    list: "/users",
    detail: (id) => `/users/${id}`,
    create: "/users",
    update: (id) => `/users/${id}`,
    remove: (id) => `/users/${id}`,
  },

  reports: {
    overview: "/reports/overview",
    list: "/reports",
  },

  settings: {
    get: "/settings",
    update: "/settings",
  },

  auditLogs: {
    list: "/audit-logs",
  },

  // ─── Collaborator ────────────────────────────────────────
  collaborator: {
    customers: {
      list: "/collaborator/customers",
      detail: (id) => `/collaborator/customers/${id}`,
    },
    orders: {
      list: "/collaborator/orders",
      detail: (id) => `/collaborator/orders/${id}`,
    },
    activations: {
      list: "/collaborator/activations",
      detail: (id) => `/collaborator/activations/${id}`,
    },
    commissions: {
      list: "/collaborator/commissions",
      summary: "/collaborator/commissions/summary",
    },
    invoices: {
      list: "/collaborator/invoices",
      detail: (id) => `/collaborator/invoices/${id}`,
    },
    profile: {
      get: "/collaborator/profile",
      update: "/collaborator/profile",
      changePassword: "/collaborator/profile/password",
    },
  },

  // ─── User ────────────────────────────────────────────────
  user: {
    overview: "/user/overview",
    myLine: "/user/my-line",
    usage: "/user/usage",
    bills: {
      list: "/user/bills",
      detail: (id) => `/user/bills/${id}`,
    },
    payments: {
      list: "/user/payments",
      create: "/user/payments",
      autopay: "/user/payments/autopay",
    },
    esim: {
      get: "/user/esim",
      install: "/user/esim/install",
      transfer: "/user/esim/transfer",
    },
    support: {
      tickets: "/user/support/tickets",
      ticketDetail: (id) => `/user/support/tickets/${id}`,
      createTicket: "/user/support/tickets",
      faq: "/user/support/faq",
    },
    profile: {
      get: "/user/profile",
      update: "/user/profile",
      changePassword: "/user/profile/password",
    },
  },
};

export default ENDPOINTS;
