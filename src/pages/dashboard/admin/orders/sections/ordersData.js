export { ORDERS_DATA } from "@/features/dash/admin/orders/mocks/orders.seed";

export const ORDER_COLUMNS = [
  { key: "orderId", label: "Order ID", className: "font-semibold text-slate-900" },
  { key: "customer", label: "Customer", className: "text-slate-800 font-medium" },
  { key: "plan", label: "Plan", className: "text-sky-700 font-medium" },
  { key: "simType", label: "SIM type", className: "text-slate-600" },
  { key: "orderDate", label: "Order date", className: "font-mono text-slate-600" },
  { key: "status", label: "Status", isStatus: true },
  { key: "action", label: "Action", align: "right" },
];

export const ORDER_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Pending", action: "status_pending" },
  { label: "Identity Verification", action: "status_verification" },
  { label: "Approved", action: "status_approved" },
  { label: "Activated", action: "status_activated" },
  { label: "Rejected", action: "status_rejected" },
];

export const ORDER_STATUS_FILTERS = [
  "All Statuses",
  "Pending",
  "Identity Verification",
  "Approved",
  "Activated",
  "Rejected",
];
