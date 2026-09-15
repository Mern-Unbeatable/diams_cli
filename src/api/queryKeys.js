/**
 * TanStack Query key factory — keep keys consistent across hooks.
 *
 * @example
 *   queryKey: queryKeys.customers.list({ page: 1 })
 *   queryKey: queryKeys.customers.detail(id)
 */
export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  customers: {
    all: ["customers"],
    list: (filters = {}) => ["customers", "list", filters],
    detail: (id) => ["customers", "detail", id],
  },
  orders: {
    all: ["orders"],
    list: (filters = {}) => ["orders", "list", filters],
    detail: (id) => ["orders", "detail", id],
  },
  support: {
    all: ["support"],
    list: (filters = {}) => ["support", "tickets", "list", filters],
    detail: (id) => ["support", "tickets", "detail", id],
  },
  esim: {
    all: ["esim"],
    list: (filters = {}) => ["esim", "list", filters],
    detail: (id) => ["esim", "detail", id],
    user: ["esim", "user"],
  },
  collaborator: {
    commissions: ["collaborator", "commissions"],
    orders: (filters = {}) => ["collaborator", "orders", filters],
    profile: ["collaborator", "profile"],
  },
  user: {
    overview: ["user", "overview"],
    bills: (filters = {}) => ["user", "bills", filters],
    payments: ["user", "payments"],
    profile: ["user", "profile"],
  },
};

export default queryKeys;
