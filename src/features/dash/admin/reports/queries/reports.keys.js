export const reportKeys = {
  all: ["dash", "admin", "reports"],
  overview: () => [...reportKeys.all, "overview"],
  lists: () => [...reportKeys.all, "list"],
  list: (filters = {}) => [...reportKeys.lists(), filters],
};
