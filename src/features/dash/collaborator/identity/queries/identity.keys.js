export const collabIdentityKeys = {
  all: ["dash", "collaborator", "identity"],
  lists: () => [...collabIdentityKeys.all, "list"],
  list: (filters = {}) => [...collabIdentityKeys.lists(), filters],
  details: () => [...collabIdentityKeys.all, "detail"],
  detail: (id) => [...collabIdentityKeys.details(), id],
};
