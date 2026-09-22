export const collabActivationKeys = {
  all: ["dash", "collaborator", "activations"],
  lists: () => [...collabActivationKeys.all, "list"],
  list: (filters = {}) => [...collabActivationKeys.lists(), filters],
  details: () => [...collabActivationKeys.all, "detail"],
  detail: (id) => [...collabActivationKeys.details(), id],
};
