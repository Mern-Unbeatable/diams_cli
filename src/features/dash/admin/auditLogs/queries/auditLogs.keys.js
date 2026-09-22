export const auditLogKeys = {
  all: ["dash", "admin", "auditLogs"],
  lists: () => [...auditLogKeys.all, "list"],
  list: (filters = {}) => [...auditLogKeys.lists(), filters],
  details: () => [...auditLogKeys.all, "detail"],
  detail: (id) => [...auditLogKeys.details(), id],
};
