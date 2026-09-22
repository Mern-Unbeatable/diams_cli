export const collabInvoiceKeys = {
  all: ["dash", "collaborator", "invoices"],
  lists: () => [...collabInvoiceKeys.all, "list"],
  list: (filters = {}) => [...collabInvoiceKeys.lists(), filters],
  details: () => [...collabInvoiceKeys.all, "detail"],
  detail: (id) => [...collabInvoiceKeys.details(), id],
};
