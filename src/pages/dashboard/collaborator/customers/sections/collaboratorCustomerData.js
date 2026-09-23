export { COLLABORATOR_CUSTOMERS_DATA } from "@/features/dash/collaborator/customers/mocks/customers.seed";

export const COLLABORATOR_STATUS_OPTIONS = ["All", "Active", "Suspended"];

export const COLLABORATOR_PLAN_OPTIONS = [
  "All",
  "NovaSky Max",
  "NovaSky Plus",
  "NovaSky One",
];

export const COLLABORATOR_SIM_TYPE_OPTIONS = ["Physical SIM", "eSIM"];

export const COLLABORATOR_CUSTOMER_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Edit", action: "edit" },
  { label: "Orders", action: "orders" },
  { label: "Activations", action: "activations" },
];
