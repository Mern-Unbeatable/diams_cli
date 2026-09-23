export { CUSTOMERS_DATA } from "@/features/dash/admin/customers/mocks/customers.seed";

export const STATUS_OPTIONS = ["All", "Active", "Suspended", "Pending"];
export const PLAN_OPTIONS = [
  "All",
  "Nova Start",
  "Nova Swiss+",
  "Nova Family",
  "Nova Roam",
];
export const LINE_STATUS_OPTIONS = ["All", "Active", "Suspended"];

export const CUSTOMER_COLUMNS = [
  { key: "customer", label: "CUSTOMER", className: "font-semibold text-slate-900" },
  { key: "email", label: "EMAIL", className: "text-slate-500" },
  { key: "phone", label: "PHONE", className: "font-mono text-slate-500" },
  { key: "plan", label: "PLAN", className: "font-medium text-slate-600" },
  { key: "lineStatus", label: "LINE STATUS", isStatus: true },
  { key: "registrationDate", label: "REGISTRATION DATE", className: "font-mono text-slate-500" },
  { key: "status", label: "STATUS", isStatus: true },
  { key: "action", label: "ACTIONS", align: "right" },
];

export const CUSTOMER_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Suspend", action: "suspend" },
  { label: "Active", action: "active" },
];
