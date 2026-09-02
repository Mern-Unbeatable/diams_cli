import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import {
  IdentityHeader,
  IdentityDetailsView,
  IDENTITY_DATA,
  IDENTITY_COLUMNS,
  IDENTITY_ACTIONS,
} from "./sections";

const AdminIdentityView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [identityList, setIdentityList] = useState(IDENTITY_DATA);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Find identity item by ID from URL parameter (support id-1, V-8841, etc.)
  const currentItem = useMemo(() => {
    if (!id) return null;
    return (
      identityList.find(
        (item) =>
          item.id.toLowerCase() === id.toLowerCase() ||
          (item.verificationId &&
            item.verificationId.toLowerCase() === id.toLowerCase()) ||
          (item.relatedOrder &&
            item.relatedOrder.toLowerCase() === id.toLowerCase())
      ) || null
    );
  }, [id, identityList]);

  // Filtering Logic
  const filteredIdentityList = useMemo(() => {
    if (selectedStatus === "All Statuses") {
      return identityList;
    }
    return identityList.filter(
      (item) => item.status.toLowerCase() === selectedStatus.toLowerCase()
    );
  }, [identityList, selectedStatus]);

  // Handle action click from DataTable's 3-dot dropdown popover
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

    if (statusMap[act]) {
      const newStatus = statusMap[act];
      setIdentityList((prev) =>
        prev.map((item) => (item.id === row.id ? { ...item, status: newStatus } : item))
      );
    }
  };

  // Approve Handler
  const handleApprove = (item) => {
    setIdentityList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "Approved" } : i))
    );
  };

  // Reject Handler
  const handleReject = (item) => {
    setIdentityList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: "Rejected" } : i))
    );
  };

  // Comment Save Handler
  const handleSaveComment = (itemId, comment) => {
    setIdentityList((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, comment } : i))
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* If URL contains id, render IdentityDetailsView */}
      {id ? (
        currentItem ? (
          <IdentityDetailsView
            item={currentItem}
            onBack={() => navigate("/dashboard/admin/identity")}
            onApprove={handleApprove}
            onReject={handleReject}
            onSaveComment={handleSaveComment}
          />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Record Not Found</h2>
            <p className="mt-1 text-xs text-slate-500">
              No identity verification record was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/identity")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to Identity Verification
            </button>
          </div>
        )
      ) : (
        <>
          {/* 1. Identity Verification Header with Status Filter */}
          <IdentityHeader
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
          />

          {/* 2. Common DataTable Component with Status Badges, Action Popover & Pagination */}
          <DataTable
            columns={IDENTITY_COLUMNS}
            data={filteredIdentityList}
            actions={IDENTITY_ACTIONS}
            onActionClick={handleActionClick}
            pageSize={10}
            emptyMessage="No identity verification records found matching the selected filter."
          />
        </>
      )}
    </div>
  );
};

export default AdminIdentityView;
