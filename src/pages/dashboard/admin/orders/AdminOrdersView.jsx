import { useState, useMemo } from "react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  OrdersHeader,
  ORDERS_DATA,
  ORDER_COLUMNS,
  ORDER_ACTIONS,
} from "./sections";

const AdminOrdersView = () => {
  const [ordersList, setOrdersList] = useState(ORDERS_DATA);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Filtering Logic
  const filteredOrders = useMemo(() => {
    if (selectedStatus === "All Statuses") {
      return ordersList;
    }
    return ordersList.filter(
      (ord) => ord.status.toLowerCase() === selectedStatus.toLowerCase()
    );
  }, [ordersList, selectedStatus]);

  // Handle action click from DataTable's 3-dot dropdown popover
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();

    const statusMap = {
      status_pending: "Pending",
      pending: "Pending",
      status_verification: "Identity Verification",
      "identity verification": "Identity Verification",
      status_approved: "Approved",
      approved: "Approved",
      status_activated: "Activated",
      activated: "Activated",
      status_rejected: "Rejected",
      rejected: "Rejected",
    };

    if (statusMap[act]) {
      const newStatus = statusMap[act];
      setOrdersList((prev) =>
        prev.map((o) => (o.id === row.id ? { ...o, status: newStatus } : o))
      );
    } else if (act.includes("detail") || act.includes("see details")) {
      console.log("View order details:", row);
    }
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Orders Management Header with Status Filter */}
      <OrdersHeader
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {/* 2. Common DataTable Component with Status Badges, Action Popover & Pagination */}
      <DataTable
        columns={ORDER_COLUMNS}
        data={filteredOrders}
        actions={ORDER_ACTIONS}
        onActionClick={handleActionClick}
        pageSize={10}
        emptyMessage="No orders found matching the selected filter."
      />
    </div>
  );
};

export default AdminOrdersView;
