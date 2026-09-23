export { INVOICES_DATA } from "@/features/dash/admin/billing/mocks/billing.seed";

export const BILLING_STATUS_FILTERS = [
  "All Statuses",
  "Paid",
  "Unpaid",
  "Refund",
];

export const BILLING_ACTIONS = [
  { label: "Generate Invoice", action: "generate_invoice" },
  { label: "Refund Invoice", action: "refund_invoice" },
  { label: "See Details", isPrimary: true, action: "details" },
];
