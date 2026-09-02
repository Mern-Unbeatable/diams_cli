import { useState, useMemo } from "react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  IdentityHeader,
  IDENTITY_DATA,
  IDENTITY_COLUMNS,
  IDENTITY_ACTIONS,
} from "./sections";

const AdminIdentityView = () => {
  const [identityList, setIdentityList] = useState(IDENTITY_DATA);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

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
    } else if (act.includes("detail") || act.includes("see details")) {
      console.log("View identity details:", row);
    }
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
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
    </div>
  );
};

export default AdminIdentityView;
