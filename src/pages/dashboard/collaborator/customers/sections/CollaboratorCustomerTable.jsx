import DataTable from "@/Components/dashboard/DataTable";
import { COLLABORATOR_CUSTOMER_ACTIONS } from "./collaboratorCustomerData";

const COLLABORATOR_CUSTOMER_COLUMNS = [
  {
    key: "customer",
    label: "CUSTOMER",
    className: "font-semibold text-slate-900",
  },
  {
    key: "email",
    label: "EMAIL",
    className: "text-slate-500",
  },
  {
    key: "phone",
    label: "PHONE",
    className: "font-mono text-slate-500",
  },
  {
    key: "plan",
    label: "PLAN",
    className: "font-medium text-slate-700",
  },
  {
    key: "simType",
    label: "SIM TYPE",
    render: (row) => (
      <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
        {row.simType || "eSIM"}
      </span>
    ),
  },
  {
    key: "registrationDate",
    label: "REGISTRATION DATE",
    className: "font-mono text-slate-500",
  },
  {
    key: "status",
    label: "STATUS",
    render: (row) => {
      const isSuspended = row.status?.toLowerCase() === "suspended";
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            isSuspended
              ? "bg-rose-50 text-rose-600 border border-rose-200/60"
              : "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
          }`}
        >
          {row.status}
        </span>
      );
    },
  },
  {
    key: "action",
    label: "ACTIONS",
    align: "center",
  },
];

const CollaboratorCustomerTable = ({
  customers = [],
  onActionClick,
  currentPage,
  pageSize = 10,
  onPageChange,
}) => {
  return (
    <DataTable
      columns={COLLABORATOR_CUSTOMER_COLUMNS}
      data={customers}
      actions={COLLABORATOR_CUSTOMER_ACTIONS}
      onActionClick={onActionClick}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      emptyMessage="No customers found matching the selected filters."
      className="border-0 shadow-none"
    />
  );
};

export default CollaboratorCustomerTable;
