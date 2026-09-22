export const planKeys = {
  all: ["public", "plans"],
  lists: () => [...planKeys.all, "list"],
  list: (filters = {}) => [...planKeys.lists(), filters],
  details: () => [...planKeys.all, "detail"],
  detail: (id) => [...planKeys.details(), id],
};
