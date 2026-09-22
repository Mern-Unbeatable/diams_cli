import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorState from "@/Components/common/ErrorState";
import {
  useCollaboratorOrder,
  useCollaboratorOrders,
} from "@/features/dash/collaborator/orders";
import { unwrapList } from "@/lib/query/unwrap";
import { isNotFoundError } from "@/lib/api/errors";
import {
  CollaboratorOrderHeader,
  CollaboratorOrderTable,
  CollaboratorOrderDetailsView,
} from "./sections";

const CollaboratorOrdersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const listFilters = status !== "All" ? { status } : {};
  const ordersQuery = useCollaboratorOrders(listFilters);
  const orderQuery = useCollaboratorOrder(id);

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

  if (id) {
    if (detailLoading) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <CollaboratorOrderTable orders={[]} isLoading />
        </div>
      );
    }

    if (detailError && !isNotFoundError(orderQuery.error)) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
            <ErrorState
              title="Unable to load order"
              error={orderQuery.error}
              onRetry={() => orderQuery.refetch()}
            />
          </div>
        </div>
      );
    }

    if (detailMissing || !currentOrder) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Order Not Found</h2>
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
        </div>
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <CollaboratorOrderDetailsView
          order={currentOrder}
          onBack={() => navigate("/dashboard/collaborator/orders")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorOrderHeader
        status={status}
        setStatus={(val) => {
          setStatus(val);
          setCurrentPage(1);
        }}
      />

      <CollaboratorOrderTable
        orders={ordersList}
        onViewOrder={(ord) =>
          navigate(`/dashboard/collaborator/orders/${ord.orderId || ord.id}`)
        }
        currentPage={currentPage}
        pageSize={10}
        onPageChange={setCurrentPage}
        isLoading={ordersQuery.isLoading}
        isFetching={ordersQuery.isFetching && !ordersQuery.isLoading}
        error={ordersQuery.isError ? ordersQuery.error : null}
        onRetry={() => ordersQuery.refetch()}
      />
    </div>
  );
};

export default CollaboratorOrdersView;
