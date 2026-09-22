export const notificationKeys = {
  all: ["dash", "admin", "notifications"],
  lists: () => [...notificationKeys.all, "list"],
  list: (filters = {}) => [...notificationKeys.lists(), filters],
  details: () => [...notificationKeys.all, "detail"],
  detail: (id) => [...notificationKeys.details(), id],
};
