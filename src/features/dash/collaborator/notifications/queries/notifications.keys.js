export const collabNotificationKeys = {
  all: ["dash", "collaborator", "notifications"],
  lists: () => [...collabNotificationKeys.all, "list"],
  list: (filters = {}) => [...collabNotificationKeys.lists(), filters],
  details: () => [...collabNotificationKeys.all, "detail"],
  detail: (id) => [...collabNotificationKeys.details(), id],
};
