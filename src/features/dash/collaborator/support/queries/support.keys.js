export const collabSupportKeys = {
  all: ["dash", "collaborator", "support"],
  lists: () => [...collabSupportKeys.all, "list"],
  list: (filters = {}) => [...collabSupportKeys.lists(), filters],
  details: () => [...collabSupportKeys.all, "detail"],
  detail: (id) => [...collabSupportKeys.details(), id],
};
