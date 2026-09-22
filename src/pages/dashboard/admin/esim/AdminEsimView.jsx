import { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronDown } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import ErrorState from "@/Components/common/ErrorState";
import {
  useEsim,
  useEsims,
  useUpdateEsim,
} from "@/features/dash/admin/esim";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  EsimHeader,
  EsimKpiCards,
  EsimDetailsView,
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

  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  const listFilters =
    selectedStatus === "All Statuses" ? {} : { status: selectedStatus };

  const esimsQuery = useEsims(listFilters);
  const allEsimsQuery = useEsims({});
  const esimQuery = useEsim(id);
  const updateEsim = useUpdateEsim();

  useMutationFeedback(updateEsim, {
    successMessage: "eSIM profile updated.",
    errorTitle: "Update failed",
  });

  const profiles = useMemo(
    () => unwrapList(esimsQuery.data),
    [esimsQuery.data],
  );
  const allProfiles = useMemo(
    () => unwrapList(allEsimsQuery.data),
    [allEsimsQuery.data],
  );

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const currentProfile = id ? esimQuery.data : null;
  const detailLoading = Boolean(id) && esimQuery.isLoading;
  const detailError = Boolean(id) && esimQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !esimQuery.isLoading &&
    (isNotFoundError(esimQuery.error) ||
      (!esimQuery.isError && !currentProfile && esimQuery.isFetched));

  const activeCount = useMemo(
    () =>
      allProfiles.filter((p) => p.esimStatus?.toLowerCase() === "active")
        .length,
    [allProfiles],
  );
  const pendingCount = useMemo(
    () =>
      allProfiles.filter(
        (p) =>
          p.esimStatus?.toLowerCase() === "pending" ||
          p.qrStatus?.toLowerCase() === "pending",
      ).length,
    [allProfiles],
  );

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

  const mutateProfile = (profileId, payload) => {
    if (updateEsim.isPending) return;
    updateEsim.mutate({ id: profileId, payload });
  };

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act === "details" || act.includes("detail")) {
      navigate(`/dashboard/admin/esim/${row.id}`);
    } else if (act === "suspend") {
      mutateProfile(row.id, { esimStatus: "Suspended" });
    } else if (act === "active") {
      mutateProfile(row.id, { esimStatus: "Active" });
    } else if (act === "pending") {
      mutateProfile(row.id, { esimStatus: "Pending" });
    } else if (act === "reissue") {
      mutateProfile(row.id, { esimStatus: "Reissue" });
    } else if (act === "generated") {
      mutateProfile(row.id, { qrStatus: "Generated" });
    } else if (act === "failed") {
      mutateProfile(row.id, { qrStatus: "Failed" });
    }
  };

  const handleDetailsStatusChange = (profileId, newStatus) => {
    mutateProfile(profileId, { esimStatus: newStatus });
  };

  if (id) {
    if (detailLoading) {
      return (
        <DataTable
          columns={columns}
          data={[]}
          isLoading
          emptyMessage="Loading eSIM profile…"
        />
      );
    }

    if (detailError && !isNotFoundError(esimQuery.error)) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
          <ErrorState
            title="Unable to load eSIM profile"
            error={esimQuery.error}
            onRetry={() => esimQuery.refetch()}
          />
        </div>
      );
    }

    if (detailMissing || !currentProfile) {
      return (
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
      );
    }

    return (
      <div className="min-h-full space-y-8 text-slate-900 font-sans">
        <EsimDetailsView
          profile={currentProfile}
          onBack={() => navigate("/dashboard/admin/esim")}
          onStatusChange={handleDetailsStatusChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8 text-slate-900 font-sans">
      <EsimHeader />

      <EsimKpiCards activeCount={activeCount} pendingCount={pendingCount} />

      <div className="space-y-4">
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

        <DataTable
          columns={columns}
          data={profiles}
          actions={ESIM_ACTIONS}
          onActionClick={handleActionClick}
          pageSize={10}
          emptyMessage="No eSIM profiles found matching the selected filter."
          isLoading={esimsQuery.isLoading}
          isFetching={esimsQuery.isFetching && !esimsQuery.isLoading}
          error={esimsQuery.isError ? esimsQuery.error : null}
          onRetry={() => esimsQuery.refetch()}
        />
      </div>
    </div>
  );
};

export default AdminEsimView;
