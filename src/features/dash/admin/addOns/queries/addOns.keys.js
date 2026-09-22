export const addOnKeys = {
  all: ["dash", "admin", "addOns"],
  lists: () => [...addOnKeys.all, "list"],
  list: (filters = {}) => [...addOnKeys.lists(), filters],
  details: () => [...addOnKeys.all, "detail"],
  detail: (id) => [...addOnKeys.details(), id],
};
