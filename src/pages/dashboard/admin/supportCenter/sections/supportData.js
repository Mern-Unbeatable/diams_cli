export { SUPPORT_TICKETS_DATA } from "@/features/dash/admin/support/mocks/support.seed";

export const SUPPORT_PRIORITY_FILTERS = [
  "All Priority",
  "High",
  "Medium",
  "Low",
];

export const SUPPORT_STATUS_FILTERS = [
  "All Statuses",
  "Pending",
  "Open",
  "Closed",
];

export const SUPPORT_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Assigned", action: "assigned" },
  { label: "Reply", action: "reply" },
  { label: "Closed", action: "closed" },
  { label: "High", action: "priority_high" },
  { label: "Low", action: "priority_low" },
  { label: "Pending", action: "status_pending" },
  { label: "Open", action: "status_open" },
  { label: "Closed", action: "status_closed" },
];
