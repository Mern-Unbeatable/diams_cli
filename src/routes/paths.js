/**
 * Why this file exists:
 * Centralizes route path strings so navigations and route modules avoid
 * magic strings. Absolute paths are for Link/navigate; SEGMENTS are
 * relative child paths used under nested route parents (React Router).
 */

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
  },

  DASHBOARD: {
    ROOT: "/dashboard",
  },

  ADMIN: {
    ROOT: "/dashboard/admin",
    SEGMENTS: {
      CUSTOMER: "customer",
      CUSTOMER_DETAIL: "customer/:id",
      ORDERS: "orders",
      ORDERS_DETAIL: "orders/:id",
      IDENTITY: "identity",
      IDENTITY_DETAIL: "identity/:id",
      PLANS: "plans",
      PLANS_CREATE: "plans/create",
      PLANS_EDIT: "plans/edit/:id",
      PLANS_DETAIL: "plans/:id",
      ADD_ONS: "add-ons",
      ADD_ONS_CREATE: "add-ons/create",
      ADD_ONS_EDIT: "add-ons/edit/:id",
      ESIM: "esim",
      ESIM_DETAIL: "esim/:id",
      BILLING: "billing",
      SUPPORT: "support",
      SUPPORT_DETAIL: "support/:id",
      NOTIFICATIONS: "notifications",
      REPORTS: "reports",
      USERS: "users",
      SETTINGS: "settings",
      AUDIT_LOGS: "audit-logs",
    },
  },

  COLLABORATOR: {
    ROOT: "/dashboard/collaborator",
    SEGMENTS: {
      CUSTOMERS: "customers",
      CUSTOMERS_DETAIL: "customers/:id",
      ORDERS: "orders",
      ORDERS_DETAIL: "orders/:id",
      ACTIVATIONS: "activations",
      ACTIVATIONS_DETAIL: "activations/:id",
      COMMISSIONS: "commissions",
      INVOICES: "invoices",
      NOTIFICATIONS: "notifications",
      PROFILE: "profile",
      IDENTITY: "identity",
      PLANS: "plans",
      SUPPORT: "support",
    },
  },

  USER: {
    ROOT: "/dashboard/user",
    SEGMENTS: {
      MY_LINE: "my-line",
      PLANS_OPTIONS: "plans-options",
      USAGE: "usage",
      BILLS: "bills",
      PAYMENTS: "payments",
      ESIM: "esim",
      MY_INFORMATION: "my-information",
      SECURITY: "security",
      SUPPORT: "support",
      NOTIFICATIONS: "notifications",
    },
  },

  PUBLIC: {
    ROOT: "/",
    /** Relative segments under RootLayout (`path: "/"`) */
    SEGMENTS: {
      PLANS: "plans",
      PLAN_DETAILS: "plans/:planId",
      PLAN_CONFIGURE: "plans/:planId/configure",
      PLAN_PERSONAL_INFO: "plans/:planId/personal-info",
      PLAN_VERIFICATION: "plans/:planId/verification",
      PLAN_PAYMENT: "plans/:planId/payment",
      PLAN_CONFIRMATION: "plans/:planId/confirmation",
      PLAN_ACTIVATION: "plans/:planId/activation",
      BUSINESS: "business",
      COVERAGE: "coverage",
      HELP: "help",
      LEGAL: "legal",
      PRIVACY: "privacy",
      TERMS: "terms",
      ACCOUNT: "account",
      NOT_FOUND: "*",
    },
  },
};

/** Absolute URL helpers for Link / navigate (same paths as before). */
export const absolute = {
  login: ROUTES.AUTH.LOGIN,
  dashboard: ROUTES.DASHBOARD.ROOT,
  admin: {
    root: ROUTES.ADMIN.ROOT,
    customer: (id) =>
      id
        ? `${ROUTES.ADMIN.ROOT}/customer/${id}`
        : `${ROUTES.ADMIN.ROOT}/customer`,
    orders: (id) =>
      id ? `${ROUTES.ADMIN.ROOT}/orders/${id}` : `${ROUTES.ADMIN.ROOT}/orders`,
    identity: (id) =>
      id
        ? `${ROUTES.ADMIN.ROOT}/identity/${id}`
        : `${ROUTES.ADMIN.ROOT}/identity`,
    plans: `${ROUTES.ADMIN.ROOT}/plans`,
    planCreate: `${ROUTES.ADMIN.ROOT}/plans/create`,
    planEdit: (id) => `${ROUTES.ADMIN.ROOT}/plans/edit/${id}`,
    planDetail: (id) => `${ROUTES.ADMIN.ROOT}/plans/${id}`,
    addOns: `${ROUTES.ADMIN.ROOT}/add-ons`,
    esim: (id) =>
      id ? `${ROUTES.ADMIN.ROOT}/esim/${id}` : `${ROUTES.ADMIN.ROOT}/esim`,
    billing: `${ROUTES.ADMIN.ROOT}/billing`,
    support: (id) =>
      id
        ? `${ROUTES.ADMIN.ROOT}/support/${id}`
        : `${ROUTES.ADMIN.ROOT}/support`,
    notifications: `${ROUTES.ADMIN.ROOT}/notifications`,
    reports: `${ROUTES.ADMIN.ROOT}/reports`,
    users: `${ROUTES.ADMIN.ROOT}/users`,
    settings: `${ROUTES.ADMIN.ROOT}/settings`,
    auditLogs: `${ROUTES.ADMIN.ROOT}/audit-logs`,
  },
  collaborator: {
    root: ROUTES.COLLABORATOR.ROOT,
    customers: (id) =>
      id
        ? `${ROUTES.COLLABORATOR.ROOT}/customers/${id}`
        : `${ROUTES.COLLABORATOR.ROOT}/customers`,
    orders: (id) =>
      id
        ? `${ROUTES.COLLABORATOR.ROOT}/orders/${id}`
        : `${ROUTES.COLLABORATOR.ROOT}/orders`,
    activations: (id) =>
      id
        ? `${ROUTES.COLLABORATOR.ROOT}/activations/${id}`
        : `${ROUTES.COLLABORATOR.ROOT}/activations`,
    commissions: `${ROUTES.COLLABORATOR.ROOT}/commissions`,
    invoices: `${ROUTES.COLLABORATOR.ROOT}/invoices`,
    notifications: `${ROUTES.COLLABORATOR.ROOT}/notifications`,
    profile: `${ROUTES.COLLABORATOR.ROOT}/profile`,
    identity: `${ROUTES.COLLABORATOR.ROOT}/identity`,
    plans: `${ROUTES.COLLABORATOR.ROOT}/plans`,
    support: `${ROUTES.COLLABORATOR.ROOT}/support`,
  },
  user: {
    root: ROUTES.USER.ROOT,
    myLine: `${ROUTES.USER.ROOT}/my-line`,
    plansOptions: `${ROUTES.USER.ROOT}/plans-options`,
    usage: `${ROUTES.USER.ROOT}/usage`,
    bills: `${ROUTES.USER.ROOT}/bills`,
    payments: `${ROUTES.USER.ROOT}/payments`,
    esim: `${ROUTES.USER.ROOT}/esim`,
    myInformation: `${ROUTES.USER.ROOT}/my-information`,
    security: `${ROUTES.USER.ROOT}/security`,
    support: `${ROUTES.USER.ROOT}/support`,
    notifications: `${ROUTES.USER.ROOT}/notifications`,
  },
  public: {
    home: ROUTES.PUBLIC.ROOT,
    plans: "/plans",
    planDetails: (planId) => `/plans/${planId}`,
    planConfigure: (planId) => `/plans/${planId}/configure`,
    planPersonalInfo: (planId) => `/plans/${planId}/personal-info`,
    planVerification: (planId) => `/plans/${planId}/verification`,
    planPayment: (planId) => `/plans/${planId}/payment`,
    planConfirmation: (planId) => `/plans/${planId}/confirmation`,
    planActivation: (planId) => `/plans/${planId}/activation`,
    business: "/business",
    coverage: "/coverage",
    help: "/help",
    legal: "/legal",
    privacy: "/privacy",
    terms: "/terms",
    account: "/account",
  },
};

export default ROUTES;
