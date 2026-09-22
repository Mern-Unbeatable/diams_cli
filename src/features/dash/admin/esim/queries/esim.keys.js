export const esimKeys = {
  all: ["dash", "admin", "esim"],
  lists: () => [...esimKeys.all, "list"],
  list: (filters = {}) => [...esimKeys.lists(), filters],
  details: () => [...esimKeys.all, "detail"],
  detail: (id) => [...esimKeys.details(), id],
};
