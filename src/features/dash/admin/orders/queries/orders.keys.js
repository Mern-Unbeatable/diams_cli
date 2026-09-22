export const orderKeys = {
  all: ["dash", "admin", "orders"],
  lists: () => [...orderKeys.all, "list"],
  list: (filters = {}) => [...orderKeys.lists(), filters],
  details: () => [...orderKeys.all, "detail"],
  detail: (id) => [...orderKeys.details(), id],
};
