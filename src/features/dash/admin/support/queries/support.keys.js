export const supportKeys = {
  all: ["dash", "admin", "support"],
  lists: () => [...supportKeys.all, "list"],
  list: (filters = {}) => [...supportKeys.lists(), filters],
  details: () => [...supportKeys.all, "detail"],
  detail: (id) => [...supportKeys.details(), id],
};
