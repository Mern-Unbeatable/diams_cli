import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import ErrorState from "@/Components/common/ErrorState";
import {
  useCustomer,
  useCustomers,
  useUpdateCustomer,
} from "@/features/dash/admin/customers";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  CustomerHeader,
  CustomerFilters,
  CustomerDetailsView,
  SuspendCustomerModal,
  CUSTOMER_COLUMNS,
  CUSTOMER_ACTIONS,
} from "./sections";

const AdminCustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [suspendTargetCustomer, setSuspendTargetCustomer] = useState(null);
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [date, setDate] = useState("");
  const [lineStatus, setLineStatus] = useState("All");

  const listFilters = useMemo(() => {
    const filters = {};
    if (status !== "All") filters.status = status;
    if (plan !== "All") filters.plan = plan;
    if (lineStatus !== "All") filters.lineStatus = lineStatus;
    if (date.trim()) filters.date = date.trim();
    return filters;
  }, [status, plan, lineStatus, date]);

  const customersQuery = useCustomers(listFilters);
  const customerQuery = useCustomer(id);
  const updateCustomer = useUpdateCustomer();

  useMutationFeedback(updateCustomer, {
    successMessage: "Customer updated.",
    errorTitle: "Update failed",
  });

  const customersList = useMemo(
    () => unwrapList(customersQuery.data),
    [customersQuery.data],
  );

  const currentCustomer = id ? customerQuery.data : null;
  const detailLoading = Boolean(id) && customerQuery.isLoading;
  const detailError = Boolean(id) && customerQuery.isError;
  const detailMissing =
    Boolean(id) &&
    !customerQuery.isLoading &&
    (isNotFoundError(customerQuery.error) ||
      (!customerQuery.isError && !currentCustomer && customerQuery.isFetched));

  const handleClearFilters = () => {
    setStatus("All");
    setPlan("All");
    setDate("");
    setLineStatus("All");
  };

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (
      act.includes("detail") ||
      act.includes("see details") ||
      act.includes("view_profile")
    ) {
      navigate(`/dashboard/admin/customer/${row.id}`);
    } else if (act.includes("suspend")) {
      setSuspendTargetCustomer(row);
    } else if (act.includes("active") && !updateCustomer.isPending) {
      updateCustomer.mutate({
        id: row.id,
        payload: { status: "Active", lineStatus: "Active" },
      });
    }
  };

  const handleConfirmSuspend = (customer) => {
    if (updateCustomer.isPending) return;
    updateCustomer.mutate({
      id: customer.id,
      payload: { status: "Suspended", lineStatus: "Suspended" },
    });
    setSuspendTargetCustomer(null);
  };

  const handleToggleStatus = (cust) => {
    if (updateCustomer.isPending) return;
    const isSuspended = cust.status?.toLowerCase() === "suspended";
    const nextStatus = isSuspended ? "Active" : "Suspended";
    updateCustomer.mutate({
      id: cust.id,
      payload: { status: nextStatus, lineStatus: nextStatus },
    });
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    if (updateCustomer.isPending) return;
    const { id: customerId, ...payload } = updatedCustomer;
    updateCustomer.mutate({ id: customerId, payload });
  };

  if (id) {
    if (detailLoading) {
      return (
        <DataTable
          columns={CUSTOMER_COLUMNS}
          data={[]}
          isLoading
          emptyMessage="Loading customer…"
        />
      );
    }

    if (detailError && !isNotFoundError(customerQuery.error)) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
          <ErrorState
            title="Unable to load customer"
            error={customerQuery.error}
            onRetry={() => customerQuery.refetch()}
          />
        </div>
      );
    }

    if (detailMissing || !currentCustomer) {
      return (
        <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Customer Not Found
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            No customer was found with ID &quot;{id}&quot;.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/admin/customer")}
            className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Back to Customer List
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <CustomerDetailsView
          customer={currentCustomer}
          onBack={() => navigate("/dashboard/admin/customer")}
          onToggleStatus={handleToggleStatus}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CustomerHeader />

      <div className="space-y-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-900">
            Customer List
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Supports search, filters, sorting, pagination, row actions,
            empty, loading and error states.
          </p>
        </div>

        <CustomerFilters
          status={status}
          setStatus={setStatus}
          plan={plan}
          setPlan={setPlan}
          date={date}
          setDate={setDate}
          lineStatus={lineStatus}
          setLineStatus={setLineStatus}
          onClearFilters={handleClearFilters}
        />

        <DataTable
          columns={CUSTOMER_COLUMNS}
          data={customersList}
          actions={CUSTOMER_ACTIONS}
          onActionClick={handleActionClick}
          pageSize={10}
          emptyMessage="No customers found matching the criteria."
          isLoading={customersQuery.isLoading}
          isFetching={customersQuery.isFetching && !customersQuery.isLoading}
          error={customersQuery.isError ? customersQuery.error : null}
          onRetry={() => customersQuery.refetch()}
        />
      </div>

      <SuspendCustomerModal
        isOpen={Boolean(suspendTargetCustomer)}
        onClose={() => setSuspendTargetCustomer(null)}
        customer={suspendTargetCustomer}
        onConfirm={handleConfirmSuspend}
      />
    </div>
  );
};

export default AdminCustomerView;
