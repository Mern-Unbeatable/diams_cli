export const userPaymentKeys = {
  all: ["dash", "user", "payments"],
  list: () => [...userPaymentKeys.all, "list"],
};
