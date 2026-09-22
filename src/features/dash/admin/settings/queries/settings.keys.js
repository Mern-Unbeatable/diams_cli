export const settingsKeys = {
  all: ["dash", "admin", "settings"],
  current: () => [...settingsKeys.all, "current"],
};
