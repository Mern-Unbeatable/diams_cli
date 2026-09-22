export const userSupportKeys = {
  all: ["dash", "user", "support"],
  tickets: () => [...userSupportKeys.all, "tickets"],
  faq: () => [...userSupportKeys.all, "faq"],
};
