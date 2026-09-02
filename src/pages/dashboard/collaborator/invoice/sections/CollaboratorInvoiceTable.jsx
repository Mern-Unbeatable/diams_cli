import { Eye, Download } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";

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

const CollaboratorInvoiceTable = ({
  invoices = [],
  onViewInvoice,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
}) => {
  const columns = [
    {
      key: "invoiceId",
      label: "Invoice ID",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "customer",
      label: "Customer",
      className: "font-bold text-slate-900",
    },
    {
      key: "totalAmount",
      label: "Amount",
      className: "font-bold text-slate-900",
    },
    {
      key: "issueDate",
      label: "Issue Date",
      className: "font-mono text-xs text-slate-400",
    },
    {
      key: "dueDate",
      label: "Due Date",
      className: "font-mono text-xs text-slate-400",
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
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            title="View Invoice"
            onClick={() => onViewInvoice && onViewInvoice(row)}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            title="Download PDF"
            onClick={() => {}}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={invoices}
      actions={false}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      emptyMessage="No invoices found."
    />
  );
};

export default CollaboratorInvoiceTable;
