import { Eye } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";

const getStatusBadge = (status) => {
  const s = String(status || "").toLowerCase();
  if (s.includes("activated") || s.includes("active") || s.includes("completed")) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 border border-emerald-200/60">
        Activated
      </span>
    );
  }
  if (s.includes("processing")) {
    return (
      <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-600 border border-sky-200/60">
        Processing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 border border-amber-200/60">
      Pending
    </span>
  );
};

const CollaboratorActivationTable = ({
  activations = [],
  onViewActivation,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
}) => {
  const columns = [
    {
      key: "customer",
      label: "Customer",
      className: "font-bold text-slate-900",
    },
    {
      key: "plan",
      label: "Plan",
      className: "font-medium text-slate-700",
    },
    {
      key: "simType",
      label: "SIM Type",
      render: (row) => (
        <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
          {row.simType}
        </span>
      ),
    },
    {
      key: "iccid",
      label: "ICCID / eSIM",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "startDate",
      label: "Request Date",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "action",
      label: "Action",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewActivation && onViewActivation(row)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5 text-slate-400 hover:text-sky-600" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={activations}
      actions={false}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      emptyMessage="No activations found matching the filter."
    />
  );
};

export default CollaboratorActivationTable;
