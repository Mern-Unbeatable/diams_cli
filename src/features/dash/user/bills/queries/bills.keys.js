export const userBillKeys = {
  all: ["dash", "user", "bills"],
  lists: () => [...userBillKeys.all, "list"],
  list: () => [...userBillKeys.lists()],
  detail: (id) => [...userBillKeys.all, "detail", id],
};
