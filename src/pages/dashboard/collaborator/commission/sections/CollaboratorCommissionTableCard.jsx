import { Eye } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import { COMMISSION_DETAILS_DATA } from "./collaboratorCommissionData";

const getStatusBadge = (status) => {
  const isPaid = status?.toLowerCase() === "paid";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isPaid
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
          : "bg-amber-50 text-amber-600 border border-amber-200/60"
      }`}
    >
      {status}
    </span>
  );
};

const CollaboratorCommissionTableCard = ({ onViewItem }) => {
  const columns = [
    {
      key: "customer",
      label: "Customer",
      className: "font-bold text-slate-900",
    },
    {
      key: "order",
      label: "Order",
      className: "font-mono text-xs text-slate-400",
    },
    {
      key: "plan",
      label: "Plan",
      className: "font-medium text-slate-700",
    },
    {
      key: "commission",
      label: "Commission",
      className: "font-bold text-slate-900",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "date",
      label: "Date",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "action",
      label: "Action",
      align: "right",
      render: (row) => (
        <button
          type="button"
          onClick={() => onViewItem && onViewItem(row)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5 text-slate-400 hover:text-sky-600" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
      <h2 className="text-base font-bold tracking-tight text-[#0b1736]">
        Commission Details
      </h2>

      <DataTable
        columns={columns}
        data={COMMISSION_DETAILS_DATA}
        actions={false}
        pageSize={10}
        emptyMessage="No commission details found."
      />
    </div>
  );
};

export default CollaboratorCommissionTableCard;
