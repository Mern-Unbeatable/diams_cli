export const collabCustomerKeys = {
  all: ["dash", "collaborator", "customers"],
  lists: () => [...collabCustomerKeys.all, "list"],
  list: (filters = {}) => [...collabCustomerKeys.lists(), filters],
  details: () => [...collabCustomerKeys.all, "detail"],
  detail: (id) => [...collabCustomerKeys.details(), id],
};
