import { useState } from "react";
import { Wallet, TrendingUp, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";

const COMMISSIONS_DATA = [
  {
    id: "comm-1",
    customer: "John Smith",
    plan: "NovaSky Plus",
    type: "Activation Bonus",
    date: "Aug 12, 2026",
    status: "Paid",
    amount: "CHF 45.00",
  },
  {
    id: "comm-2",
    customer: "Anna Müller",
    plan: "NovaSky Max",
    type: "Activation Bonus",
    date: "Aug 10, 2026",
    status: "Paid",
    amount: "CHF 60.00",
  },
  {
    id: "comm-3",
    customer: "Marco Rossi",
    plan: "NovaSky One",
    type: "Recurring Monthly",
    date: "Aug 15, 2026",
    status: "Pending",
    amount: "CHF 15.00",
  },
  {
    id: "comm-4",
    customer: "Sophie Bernard",
    plan: "NovaSky Plus",
    type: "Activation Bonus",
    date: "Aug 14, 2026",
    status: "Processing",
    amount: "CHF 45.00",
  },
  {
    id: "comm-5",
    customer: "Thomas Weber",
    plan: "NovaSky Max",
    type: "Activation Bonus",
    date: "Aug 8, 2026",
    status: "Paid",
    amount: "CHF 60.00",
  },
  {
    id: "comm-6",
    customer: "Léa Dubois",
    plan: "NovaSky One",
    type: "Activation Bonus",
    date: "Aug 5, 2026",
    status: "Paid",
    amount: "CHF 30.00",
  },
  {
    id: "comm-7",
    customer: "Claire Dubois",
    plan: "NovaSky Plus",
    type: "Recurring Monthly",
    date: "Aug 3, 2026",
    status: "Paid",
    amount: "CHF 20.00",
  },
];

const CollaboratorCommissionsView = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
      key: "type",
      label: "Commission Type",
      className: "text-slate-600",
    },
    {
      key: "date",
      label: "Date",
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
      align: "right",
      className: "font-bold text-slate-900",
    },
  ];

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
          Commissions & Earnings
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Overview of your earned partner commissions and payout status.
        </p>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Total Commission Earned
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-50 text-[#0080ff]">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900">
            CHF 275.00
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              This Month Commission
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900">
            CHF 135.00
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Pending Payout
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-extrabold text-slate-900">
            CHF 60.00
          </div>
        </div>
      </div>

      {/* Commission Table */}
      <DataTable
        columns={columns}
        data={COMMISSIONS_DATA}
        actions={false}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        emptyMessage="No commission records found."
      />
    </div>
  );
};

export default CollaboratorCommissionsView;
