export const identityKeys = {
  all: ["dash", "admin", "identity"],
  lists: () => [...identityKeys.all, "list"],
  list: (filters = {}) => [...identityKeys.lists(), filters],
  details: () => [...identityKeys.all, "detail"],
  detail: (id) => [...identityKeys.details(), id],
};
