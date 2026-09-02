import { useState, useMemo } from "react";
import { ChevronDown, Eye, Power } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";

const ACTIVATIONS_DATA = [
  {
    id: "act-1",
    customer: "John Smith",
    plan: "NovaSky Plus",
    simType: "eSIM",
    iccid: "89410 20000 12345 67891",
    requestDate: "Aug 12, 2026",
    status: "Activated",
  },
  {
    id: "act-2",
    customer: "Anna Müller",
    plan: "NovaSky Max",
    simType: "Physical SIM",
    iccid: "89410 20000 12345 67892",
    requestDate: "Aug 10, 2026",
    status: "Activated",
  },
  {
    id: "act-3",
    customer: "Marco Rossi",
    plan: "NovaSky One",
    simType: "eSIM",
    iccid: "89410 20000 12345 67893",
    requestDate: "Aug 15, 2026",
    status: "Pending",
  },
  {
    id: "act-4",
    customer: "Sophie Bernard",
    plan: "NovaSky Plus",
    simType: "Physical SIM",
    iccid: "89410 20000 12345 67894",
    requestDate: "Aug 14, 2026",
    status: "Processing",
  },
  {
    id: "act-5",
    customer: "Thomas Weber",
    plan: "NovaSky Max",
    simType: "eSIM",
    iccid: "89410 20000 12345 67895",
    requestDate: "Aug 8, 2026",
    status: "Activated",
  },
  {
    id: "act-6",
    customer: "Léa Dubois",
    plan: "NovaSky One",
    simType: "Physical SIM",
    iccid: "89410 20000 12345 67896",
    requestDate: "Aug 5, 2026",
    status: "Activated",
  },
  {
    id: "act-7",
    customer: "Claire Dubois",
    plan: "NovaSky Plus",
    simType: "eSIM",
    iccid: "89410 20000 12345 67897",
    requestDate: "Aug 3, 2026",
    status: "Activated",
  },
];

const STATUS_OPTIONS = ["All", "Activated", "Pending", "Processing"];

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

const CollaboratorActivationsView = () => {
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return ACTIVATIONS_DATA.filter((item) => {
      if (status !== "All" && item.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [status]);

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
      key: "requestDate",
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
      render: () => (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors cursor-pointer"
        >
          <Eye className="h-3.5 w-3.5 text-slate-400 hover:text-sky-600" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0b1736] sm:text-[28px]">
            Activations
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Track all customer line activations and SIM status.
          </p>
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex flex-col items-start sm:items-end gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            STATUS
          </label>
          <div className="relative min-w-[140px]">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3.5 pr-8 text-xs font-semibold text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer shadow-2xs"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Table Card */}
      <DataTable
        columns={columns}
        data={filteredData}
        actions={false}
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        emptyMessage="No activations found matching the filter."
      />
    </div>
  );
};

export default CollaboratorActivationsView;
