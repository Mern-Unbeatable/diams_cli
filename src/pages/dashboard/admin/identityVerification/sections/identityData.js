export const IDENTITY_DATA = [
  {
    id: "id-1",
    customer: "Albert Flores",
    documentType: "National ID Card",
    submittedDate: "07/08/2026",
    status: "Pending",
  },
  {
    id: "id-2",
    customer: "Marvin McKinney",
    documentType: "Driving License",
    submittedDate: "07/08/2026",
    status: "Approved",
  },
  {
    id: "id-3",
    customer: "Dianne Russell",
    documentType: "Driving License",
    submittedDate: "07/08/2026",
    status: "Approved",
  },
  {
    id: "id-4",
    customer: "Cameron Williamson",
    documentType: "Driving License",
    submittedDate: "07/08/2026",
    status: "Approved",
  },
  {
    id: "id-5",
    customer: "Robert Fox",
    documentType: "National ID Card",
    submittedDate: "07/08/2026",
    status: "Pending",
  },
  {
    id: "id-6",
    customer: "Jane Cooper",
    documentType: "National ID Card",
    submittedDate: "07/08/2026",
    status: "Rejected",
  },
  {
    id: "id-7",
    customer: "Brooklyn Simmons",
    documentType: "National ID Card",
    submittedDate: "07/08/2026",
    status: "Rejected",
  },
  {
    id: "id-8",
    customer: "Wade Warren",
    documentType: "Driving License",
    submittedDate: "07/08/2026",
    status: "Pending",
  },
  {
    id: "id-9",
    customer: "Jerome Bell",
    documentType: "National ID Card",
    submittedDate: "07/08/2026",
    status: "Pending",
  },
  {
    id: "id-10",
    customer: "Jacob Jones",
    documentType: "Driving License",
    submittedDate: "07/08/2026",
    status: "Pending",
  },
];

export const IDENTITY_COLUMNS = [
  { key: "customer", label: "Customer", className: "font-medium text-slate-900" },
  { key: "documentType", label: "Document Type", className: "text-slate-600" },
  { key: "submittedDate", label: "Submitted Date", className: "font-mono text-slate-600" },
  { key: "status", label: "Status", isStatus: true },
  { key: "action", label: "Action", align: "center" },
];

export const IDENTITY_ACTIONS = [
  { label: "See Details", isPrimary: true, action: "details" },
  { label: "Pending", action: "status_pending" },
  { label: "Approved", action: "status_approved" },
  { label: "Rejected", action: "status_rejected" },
];

export const IDENTITY_STATUS_FILTERS = [
  "All Statuses",
  "Pending",
  "Approved",
  "Rejected",
];
