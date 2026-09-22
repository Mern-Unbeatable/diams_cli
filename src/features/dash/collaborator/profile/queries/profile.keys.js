export const collabProfileKeys = {
  all: ["dash", "collaborator", "profile"],
  current: () => [...collabProfileKeys.all, "current"],
};
