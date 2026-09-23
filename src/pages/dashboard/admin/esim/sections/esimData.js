export { ESIM_PROFILES_DATA } from "@/features/dash/admin/esim/mocks/esim.seed";

export const ESIM_STATUS_FILTERS = [
  "All Statuses",
  "Active",
  "Suspended",
  "Pending",
  "Reissue",
  "Generated",
  "Failed",
];

export const ESIM_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Suspend", action: "suspend" },
  { label: "Active", action: "active" },
  { label: "Pending", action: "pending" },
  { label: "Reissue", action: "reissue" },
  { label: "Generated", action: "generated" },
  { label: "Failed", action: "failed" },
];
