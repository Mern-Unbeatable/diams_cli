import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import ErrorState from "@/Components/common/ErrorState";
import {
  useIdentity,
  useIdentityList,
  useUpdateIdentity,
} from "@/features/dash/admin/identity";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  IdentityHeader,
  IdentityDetailsView,
  IDENTITY_COLUMNS,
  IDENTITY_ACTIONS,
} from "./sections";

const AdminIdentityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const listFilters =
    selectedStatus === "All Statuses" ? {} : { status: selectedStatus };

  const identityListQuery = useIdentityList(listFilters);
  const identityQuery = useIdentity(id);
  const updateIdentity = useUpdateIdentity();

  useMutationFeedback(updateIdentity, {
    successMessage: "Identity record updated.",
    errorTitle: "Update failed",
  });

  const identityList = useMemo(
    () => unwrapList(identityListQuery.data),
    [identityListQuery.data],
  );

  const currentItem = id ? identityQuery.data : null;
  const detailLoading = Boolean(id) && identityQuery.isLoading;
  const detailError = Boolean(id) && identityQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !identityQuery.isLoading &&
    (isNotFoundError(identityQuery.error) ||
      (!identityQuery.isError && !currentItem && identityQuery.isFetched));

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();

    if (
      act.includes("detail") ||
      act.includes("see details") ||
      act.includes("view")
    ) {
      navigate(`/dashboard/admin/identity/${row.id}`);
      return;
    }

    const statusMap = {
      status_pending: "Pending",
      pending: "Pending",
      status_approved: "Approved",
      approved: "Approved",
      status_rejected: "Rejected",
      rejected: "Rejected",
    };

    if (statusMap[act] && !updateIdentity.isPending) {
      updateIdentity.mutate({
        id: row.id,
        payload: { status: statusMap[act] },
      });
    }
  };

  const handleApprove = (item) => {
    if (updateIdentity.isPending) return;
    updateIdentity.mutate({ id: item.id, payload: { status: "Approved" } });
  };

  const handleReject = (item) => {
    if (updateIdentity.isPending) return;
    updateIdentity.mutate({ id: item.id, payload: { status: "Rejected" } });
  };

  const handleSaveComment = (itemId, comment) => {
    if (updateIdentity.isPending) return;
    updateIdentity.mutate({ id: itemId, payload: { comment } });
  };

  if (id) {
    if (detailLoading) {
      return (
        <DataTable
          columns={IDENTITY_COLUMNS}
          data={[]}
          isLoading
          emptyMessage="Loading identity record…"
        />
      );
    }

    if (detailError && !isNotFoundError(identityQuery.error)) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
          <ErrorState
            title="Unable to load identity record"
            error={identityQuery.error}
            onRetry={() => identityQuery.refetch()}
          />
        </div>
      );
    }

    if (detailMissing || !currentItem) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Record Not Found
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            No identity verification record was found with ID &quot;{id}
            &quot;.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/admin/identity")}
            className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Back to Identity Verification
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <IdentityDetailsView
          item={currentItem}
          onBack={() => navigate("/dashboard/admin/identity")}
          onApprove={handleApprove}
          onReject={handleReject}
          onSaveComment={handleSaveComment}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <IdentityHeader
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      <DataTable
        columns={IDENTITY_COLUMNS}
        data={identityList}
        actions={IDENTITY_ACTIONS}
        onActionClick={handleActionClick}
        pageSize={10}
        emptyMessage="No identity verification records found matching the selected filter."
        isLoading={identityListQuery.isLoading}
        isFetching={
          identityListQuery.isFetching && !identityListQuery.isLoading
        }
        error={identityListQuery.isError ? identityListQuery.error : null}
        onRetry={() => identityListQuery.refetch()}
      />
    </div>
  );
};

export default AdminIdentityView;
