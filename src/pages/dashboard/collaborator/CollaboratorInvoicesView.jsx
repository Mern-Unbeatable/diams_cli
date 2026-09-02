import { useState } from "react";
import { FileText, Download } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";

const INVOICES_DATA = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-001",
    customer: "John Smith",
    plan: "NovaSky Plus",
    issueDate: "Aug 12, 2026",
    dueDate: "Sep 12, 2026",
    status: "Paid",
    amount: "CHF 39.90",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-002",
    customer: "Anna Müller",
    plan: "NovaSky Max",
    issueDate: "Aug 10, 2026",
    dueDate: "Sep 10, 2026",
    status: "Paid",
    amount: "CHF 59.90",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-003",
    customer: "Marco Rossi",
    plan: "NovaSky One",
    issueDate: "Aug 15, 2026",
    dueDate: "Sep 15, 2026",
    status: "Unpaid",
    amount: "CHF 24.90",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-004",
    customer: "Sophie Bernard",
    plan: "NovaSky Plus",
    issueDate: "Aug 14, 2026",
    dueDate: "Sep 14, 2026",
    status: "Processing",
    amount: "CHF 39.90",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV-2026-005",
    customer: "Thomas Weber",
    plan: "NovaSky Max",
    issueDate: "Aug 8, 2026",
    dueDate: "Sep 8, 2026",
    status: "Paid",
    amount: "CHF 59.90",
  },
  {
    id: "inv-6",
    invoiceNumber: "INV-2026-006",
    customer: "Léa Dubois",
    plan: "NovaSky One",
    issueDate: "Aug 5, 2026",
    dueDate: "Sep 5, 2026",
    status: "Paid",
    amount: "CHF 24.90",
  },
  {
    id: "inv-7",
    invoiceNumber: "INV-2026-007",
    customer: "Claire Dubois",
    plan: "NovaSky Plus",
    issueDate: "Aug 3, 2026",
    dueDate: "Sep 3, 2026",
    status: "Paid",
    amount: "CHF 39.90",
  },
];

const CollaboratorInvoicesView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: "invoiceNumber",
      label: "Invoice #",
      className: "font-mono text-xs font-semibold text-sky-600",
    },
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
      key: "issueDate",
      label: "Issue Date",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "dueDate",
      label: "Due Date",
      className: "font-mono text-xs text-slate-500",
    },
    {
      key: "status",
      label: "Status",
      render: (row) => {
        const isPaid = row.status === "Paid";
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              isPaid
                ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                : row.status === "Processing"
                ? "bg-sky-50 text-sky-600 border border-sky-200/60"
                : "bg-amber-50 text-amber-600 border border-amber-200/60"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: "amount",
      label: "Amount",
      className: "font-bold text-slate-900",
    },
    {
      key: "action",
      label: "Action",
      align: "right",
      render: () => (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <Download className="h-3.5 w-3.5 text-slate-400 hover:text-sky-600" />
          <span>PDF</span>
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Invoices & Documents
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Access customer billing invoices, contract receipts, and partner payout statements.
        </p>
      </div>

      {/* Invoices Table Card */}
      <DataTable
        columns={columns}
        data={INVOICES_DATA}
        actions={false}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        emptyMessage="No invoices found."
      />
    </div>
  );
};

export default CollaboratorInvoicesView;
