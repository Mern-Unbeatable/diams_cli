export const collabCommissionKeys = {
  all: ["dash", "collaborator", "commissions"],
  list: () => [...collabCommissionKeys.all, "list"],
  summary: () => [...collabCommissionKeys.all, "summary"],
};
