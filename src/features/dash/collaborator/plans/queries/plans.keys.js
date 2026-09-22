export const collabPlanKeys = {
  all: ["dash", "collaborator", "plans"],
  lists: () => [...collabPlanKeys.all, "list"],
  list: (filters = {}) => [...collabPlanKeys.lists(), filters],
  details: () => [...collabPlanKeys.all, "detail"],
  detail: (id) => [...collabPlanKeys.details(), id],
};
