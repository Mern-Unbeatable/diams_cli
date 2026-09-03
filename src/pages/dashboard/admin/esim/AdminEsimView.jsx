import { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  EsimHeader,
  EsimKpiCards,
  EsimDetailsView,
  ESIM_PROFILES_DATA,
  ESIM_STATUS_FILTERS,
  ESIM_ACTIONS,
} from "./sections";

const getEsimStatusBadge = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "active":
      return "bg-[#e6f4ea] text-[#137333]";
    case "suspended":
      return "bg-[#fee2e2] text-[#ef4444]";
    case "pending":
      return "bg-[#fef9c3] text-[#a16207]";
    case "reissue":
      return "bg-[#f3e8ff] text-[#7e22ce]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const getQrStatusBadge = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "generated":
      return "bg-[#e6f4ea] text-[#137333]";
    case "pending":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "failed":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const AdminEsimView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState(ESIM_PROFILES_DATA);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Find active profile for details view
  const currentProfile = useMemo(() => {
    if (!id) return null;
    return (
      profiles.find(
        (p) =>
          p.id.toLowerCase() === id.toLowerCase() ||
          p.customer.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase(),
      ) || profiles[0]
    );
  }, [id, profiles]);

  // Filter profiles based on selected status
  const filteredProfiles = useMemo(() => {
    if (selectedStatus === "All Statuses") return profiles;
    return profiles.filter(
      (p) =>
        p.esimStatus.toLowerCase() === selectedStatus.toLowerCase() ||
        p.qrStatus.toLowerCase() === selectedStatus.toLowerCase(),
    );
  }, [profiles, selectedStatus]);

  // Dynamic KPI counts
  const activeCount = useMemo(
    () =>
      profiles.filter((p) => p.esimStatus.toLowerCase() === "active").length,
    [profiles],
  );
  const pendingCount = useMemo(
    () =>
      profiles.filter(
        (p) =>
          p.esimStatus.toLowerCase() === "pending" ||
          p.qrStatus.toLowerCase() === "pending",
      ).length,
    [profiles],
  );

  // Table Columns Definition matching the screenshot
  const columns = useMemo(
    () => [
      {
        key: "customer",
        label: "Customer",
        render: (row) => (
          <span className="font-semibold text-slate-900">{row.customer}</span>
        ),
      },
      {
        key: "documentType",
        label: "Document Type",
        render: (row) => (
          <span className="text-slate-700">{row.documentType}</span>
        ),
      },
      {
        key: "esimStatus",
        label: "eSim Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getEsimStatusBadge(
              row.esimStatus,
            )}`}
          >
            {row.esimStatus}
          </span>
        ),
      },
      {
        key: "activationDate",
        label: "Activation Date",
        render: (row) => (
          <span className="text-slate-600">{row.activationDate}</span>
        ),
      },
      {
        key: "qrStatus",
        label: "Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getQrStatusBadge(
              row.qrStatus,
            )}`}
          >
            {row.qrStatus}
          </span>
        ),
      },
      {
        key: "action",
        label: "Action",
        align: "center",
      },
    ],
    [],
  );

  // Action Click Handler
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act === "details" || act.includes("detail")) {
      navigate(`/dashboard/admin/esim/${row.id}`);
    } else if (act === "suspend") {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === row.id ? { ...p, esimStatus: "Suspended" } : p,
        ),
      );
    } else if (act === "active") {
      setProfiles((prev) =>
        prev.map((p) => (p.id === row.id ? { ...p, esimStatus: "Active" } : p)),
      );
    } else if (act === "pending") {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === row.id ? { ...p, esimStatus: "Pending" } : p,
        ),
      );
    } else if (act === "reissue") {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === row.id ? { ...p, esimStatus: "Reissue" } : p,
        ),
      );
    } else if (act === "generated") {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === row.id ? { ...p, qrStatus: "Generated" } : p,
        ),
      );
    } else if (act === "failed") {
      setProfiles((prev) =>
        prev.map((p) => (p.id === row.id ? { ...p, qrStatus: "Failed" } : p)),
      );
    }
  };

  // Status Change from Details View
  const handleDetailsStatusChange = (profileId, newStatus) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === profileId ? { ...p, esimStatus: newStatus } : p,
      ),
    );
  };

  return (
    <div className="min-h-full space-y-8 text-slate-900 font-sans">
      {/* 1. If URL contains :id, render EsimDetailsView */}
      {id ? (
        currentProfile ? (
          <EsimDetailsView
            profile={currentProfile}
            onBack={() => navigate("/dashboard/admin/esim")}
            onStatusChange={handleDetailsStatusChange}
          />
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Profile Not Found
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No eSIM profile was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/esim")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to eSIM Profiles
            </button>
          </div>
        )
      ) : (
        /* 2. Main eSIM Management View */
        <>
          {/* Header */}
          <EsimHeader />

          {/* KPI Metric Cards */}
          <EsimKpiCards activeCount={activeCount} pendingCount={pendingCount} />

          {/* eSIM Profiles Section & DataTable */}
          <div className="space-y-4">
            {/* Section Header with Status Filter Dropdown */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  eSIM Profiles
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Activate, suspend, reissue, delete or view QR generation
                  status.
                </p>
              </div>

              {/* Status Filter Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
                >
                  <span>{selectedStatus}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 top-full z-20 mt-1.5 min-w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                    {ESIM_STATUS_FILTERS.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setSelectedStatus(status);
                          setIsFilterOpen(false);
                        }}
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                          selectedStatus === status
                            ? "bg-sky-50 text-sky-600 font-semibold"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Common DataTable Component */}
            <DataTable
              columns={columns}
              data={filteredProfiles}
              actions={ESIM_ACTIONS}
              onActionClick={handleActionClick}
              pageSize={10}
              emptyMessage="No eSIM profiles found matching the selected filter."
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminEsimView;
