export const addOnKeys = {
  all: ["public", "addOns"],
  lists: () => [...addOnKeys.all, "list"],
  list: (filters = {}) => [...addOnKeys.lists(), filters],
  details: () => [...addOnKeys.all, "detail"],
  detail: (id) => [...addOnKeys.details(), id],
};
