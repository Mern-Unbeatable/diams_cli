export const collabOrderKeys = {
  all: ["dash", "collaborator", "orders"],
  lists: () => [...collabOrderKeys.all, "list"],
  list: (filters = {}) => [...collabOrderKeys.lists(), filters],
  details: () => [...collabOrderKeys.all, "detail"],
  detail: (id) => [...collabOrderKeys.details(), id],
};
