export const billingKeys = {
  all: ["dash", "admin", "billing"],
  lists: () => [...billingKeys.all, "list"],
  list: (filters = {}) => [...billingKeys.lists(), filters],
  details: () => [...billingKeys.all, "detail"],
  detail: (id) => [...billingKeys.details(), id],
};
