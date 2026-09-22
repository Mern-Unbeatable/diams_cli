export const userKeys = {
  all: ["dash", "admin", "users"],
  lists: () => [...userKeys.all, "list"],
  list: (filters = {}) => [...userKeys.lists(), filters],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
};
