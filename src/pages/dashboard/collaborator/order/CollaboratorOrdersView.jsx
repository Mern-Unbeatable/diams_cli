import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  CollaboratorOrderHeader,
  CollaboratorOrderTable,
  CollaboratorOrderDetailsView,
  COLLABORATOR_ORDERS_DATA,
} from "./sections";

const CollaboratorOrdersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ordersList] = useState(COLLABORATOR_ORDERS_DATA);
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Find order by ID from URL parameter (e.g. ord-1 or ORD-2026-001)
  const currentOrder = useMemo(() => {
    if (!id) return null;
    return (
      ordersList.find(
        (o) =>
          o.id.toLowerCase() === id.toLowerCase() ||
          (o.orderId && o.orderId.toLowerCase() === id.toLowerCase()),
      ) || null
    );
  }, [id, ordersList]);

  // Filter Orders by Status
  const filteredOrders = useMemo(() => {
    return ordersList.filter((ord) => {
      if (
        status !== "All" &&
        ord.status.toLowerCase() !== status.toLowerCase()
      ) {
        return false;
      }
      return true;
    });
  }, [ordersList, status]);

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* If URL contains order id parameter, render OrderDetailsView */}
      {id ? (
        currentOrder ? (
          <CollaboratorOrderDetailsView
            order={currentOrder}
            onBack={() => navigate("/dashboard/collaborator/orders")}
          />
        ) : (
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Order Not Found
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No order was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/collaborator/orders")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 cursor-pointer"
            >
              Back to Orders List
            </button>
          </div>
        )
      ) : (
        <>
          {/* 1. Header with STATUS dropdown */}
          <CollaboratorOrderHeader
            status={status}
            setStatus={(val) => {
              setStatus(val);
              setCurrentPage(1);
            }}
          />

          {/* 2. Orders Table */}
          <CollaboratorOrderTable
            orders={filteredOrders}
            onViewOrder={(ord) =>
              navigate(
                `/dashboard/collaborator/orders/${ord.orderId || ord.id}`,
              )
            }
            currentPage={currentPage}
            pageSize={10}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CollaboratorOrdersView;
