import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import {
  OrdersHeader,
  OrderDetailsView,
  ORDERS_DATA,
  ORDER_COLUMNS,
  ORDER_ACTIONS,
} from "./sections";

const AdminOrdersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ordersList, setOrdersList] = useState(ORDERS_DATA);
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  // Find order by ID from URL parameter (support ord-1, BK-001, and ORD-7001)
  const currentOrder = useMemo(() => {
    if (!id) return null;
    return (
      ordersList.find(
        (o) =>
          o.id.toLowerCase() === id.toLowerCase() ||
          o.orderId.toLowerCase() === id.toLowerCase() ||
          (o.orderDetailId && o.orderDetailId.toLowerCase() === id.toLowerCase())
      ) || null
    );
  }, [id, ordersList]);

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

    if (
      act.includes("detail") ||
      act.includes("see details") ||
      act.includes("view")
    ) {
      navigate(`/dashboard/admin/orders/${row.id}`);
      return;
    }

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
    }
  };

  // Approve Order Handler
  const handleApprove = (order) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Approved" } : o))
    );
  };

  // Reject Order Handler
  const handleReject = (order) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === order.id ? { ...o, status: "Rejected" } : o))
    );
  };

  // Save Internal Note Handler
  const handleSaveNote = (orderId, note) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, internalNote: note } : o))
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* If URL contains order id, render OrderDetailsView */}
      {id ? (
        currentOrder ? (
          <OrderDetailsView
            order={currentOrder}
            onBack={() => navigate("/dashboard/admin/orders")}
            onApprove={handleApprove}
            onReject={handleReject}
            onSaveNote={handleSaveNote}
          />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Order Not Found</h2>
            <p className="mt-1 text-xs text-slate-500">
              No order was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/admin/orders")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to Orders List
            </button>
          </div>
        )
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AdminOrdersView;
