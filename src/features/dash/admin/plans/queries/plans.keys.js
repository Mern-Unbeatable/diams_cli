export const planKeys = {
  all: ["dash", "admin", "plans"],
  lists: () => [...planKeys.all, "list"],
  list: (filters = {}) => [...planKeys.lists(), filters],
  details: () => [...planKeys.all, "detail"],
  detail: (id) => [...planKeys.details(), id],
};
