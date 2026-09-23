import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import ErrorState from "@/Components/common/ErrorState";
import {
  useOrder,
  useOrders,
  useUpdateOrder,
} from "@/features/dash/admin/orders";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  OrdersHeader,
  OrderDetailsView,
  ORDER_COLUMNS,
  ORDER_ACTIONS,
} from "./sections";

const AdminOrdersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");

  const listFilters =
    selectedStatus === "All Statuses" ? {} : { status: selectedStatus };

  const ordersQuery = useOrders(listFilters);
  const orderQuery = useOrder(id);
  const updateOrder = useUpdateOrder();

  useMutationFeedback(updateOrder, {
    successMessage: "Order updated.",
    errorTitle: "Update failed",
  });

  const ordersList = useMemo(
    () => unwrapList(ordersQuery.data),
    [ordersQuery.data],
  );

  const currentOrder = id ? orderQuery.data : null;
  const detailLoading = Boolean(id) && orderQuery.isLoading;
  const detailError = Boolean(id) && orderQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !orderQuery.isLoading &&
    (isNotFoundError(orderQuery.error) ||
      (!orderQuery.isError && !currentOrder && orderQuery.isFetched));

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

    if (statusMap[act] && !updateOrder.isPending) {
      updateOrder.mutate({ id: row.id, payload: { status: statusMap[act] } });
    }
  };

  const handleApprove = (order) => {
    if (updateOrder.isPending) return;
    updateOrder.mutate({ id: order.id, payload: { status: "Approved" } });
  };

  const handleReject = (order) => {
    if (updateOrder.isPending) return;
    updateOrder.mutate({ id: order.id, payload: { status: "Rejected" } });
  };

  const handleSaveNote = (orderId, note) => {
    if (updateOrder.isPending) return;
    updateOrder.mutate({ id: orderId, payload: { internalNote: note } });
  };

  if (id) {
    if (detailLoading) {
      return (
        <DataTable
          columns={ORDER_COLUMNS}
          data={[]}
          isLoading
          emptyMessage="Loading order…"
        />
      );
    }

    if (detailError && !isNotFoundError(orderQuery.error)) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
          <ErrorState
            title="Unable to load order"
            error={orderQuery.error}
            onRetry={() => orderQuery.refetch()}
          />
        </div>
      );
    }

    if (detailMissing || !currentOrder) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
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
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <OrderDetailsView
          order={currentOrder}
          onBack={() => navigate("/dashboard/admin/orders")}
          onApprove={handleApprove}
          onReject={handleReject}
          onSaveNote={handleSaveNote}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <OrdersHeader
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      <DataTable
        columns={ORDER_COLUMNS}
        data={ordersList}
        actions={ORDER_ACTIONS}
        onActionClick={handleActionClick}
        pageSize={10}
        emptyMessage="No orders found matching the selected filter."
        isLoading={ordersQuery.isLoading}
        isFetching={ordersQuery.isFetching && !ordersQuery.isLoading}
        error={ordersQuery.isError ? ordersQuery.error : null}
        onRetry={() => ordersQuery.refetch()}
      />
    </div>
  );
};

export default AdminOrdersView;
