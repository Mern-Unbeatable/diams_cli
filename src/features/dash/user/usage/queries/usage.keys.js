export const userUsageKeys = {
  all: ["dash", "user", "usage"],
  current: () => [...userUsageKeys.all, "current"],
};
