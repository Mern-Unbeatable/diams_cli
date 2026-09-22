export const userEsimKeys = {
  all: ["dash", "user", "esim"],
  current: () => [...userEsimKeys.all, "current"],
};
