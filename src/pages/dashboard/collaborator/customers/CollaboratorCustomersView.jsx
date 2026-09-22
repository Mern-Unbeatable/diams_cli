import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ErrorState from "@/Components/common/ErrorState";
import {
  useCollaboratorCustomer,
  useCollaboratorCustomers,
  useCreateCollaboratorCustomer,
  useUpdateCollaboratorCustomer,
} from "@/features/dash/collaborator/customers";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import { isNotFoundError } from "@/lib/api/errors";
import {
  CollaboratorCustomerHeader,
  CollaboratorCustomerFilters,
  CollaboratorCustomerTable,
  CollaboratorCustomerDetailsView,
  CollaboratorRegisterCustomerView,
  CollaboratorEditCustomerModal,
} from "./sections";

const CollaboratorCustomersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isRegisteringView, setIsRegisteringView] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const isRegisterMode = id === "register" || isRegisteringView;
  const detailId = id && id !== "register" ? id : null;

  const listFilters = {
    ...(status !== "All" ? { status } : {}),
    ...(plan !== "All" ? { plan } : {}),
  };

  const customersQuery = useCollaboratorCustomers(listFilters);
  const customerQuery = useCollaboratorCustomer(detailId);
  const createCustomer = useCreateCollaboratorCustomer();
  const updateCustomer = useUpdateCollaboratorCustomer();

  useMutationFeedback(createCustomer, {
    successMessage: "Customer registered.",
    errorTitle: "Registration failed",
  });
  useMutationFeedback(updateCustomer, {
    successMessage: "Customer updated.",
    errorTitle: "Update failed",
  });

  const customersList = useMemo(
    () => unwrapList(customersQuery.data),
    [customersQuery.data],
  );

  const currentCustomer = detailId ? customerQuery.data : null;
  const detailLoading = Boolean(detailId) && customerQuery.isLoading;
  const detailError = Boolean(detailId) && customerQuery.isError;
  const detailMissing =
    Boolean(detailId) &&
    !customerQuery.isLoading &&
    (isNotFoundError(customerQuery.error) ||
      (!customerQuery.isError && !currentCustomer && customerQuery.isFetched));

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("detail") || act.includes("see details")) {
      navigate(`/dashboard/collaborator/customers/${row.id}`);
    } else if (act.includes("edit")) {
      setEditingCustomer(row);
    } else if (act.includes("order")) {
      navigate("/dashboard/collaborator/orders");
    } else if (act.includes("activation")) {
      navigate("/dashboard/collaborator/activations");
    }
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
    if (updateCustomer.isPending || !updatedCustomer?.id) return;
    const { id: customerId, ...payload } = updatedCustomer;
    updateCustomer.mutate(
      { id: customerId, payload },
      { onSuccess: () => setEditingCustomer(null) },
    );
  };

  const handleRegisterSuccess = (newCustomer) => {
    if (createCustomer.isPending) return;
    createCustomer.mutate(newCustomer, {
      onSuccess: (created) => {
        setIsRegisteringView(false);
        navigate(`/dashboard/collaborator/customers/${created.id}`);
      },
    });
  };

  if (isRegisterMode) {
    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <CollaboratorRegisterCustomerView
          onBack={() => {
            setIsRegisteringView(false);
            navigate("/dashboard/collaborator/customers");
          }}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </div>
    );
  }

  if (detailId) {
    if (detailLoading) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <CollaboratorCustomerTable customers={[]} isLoading />
        </div>
      );
    }

    if (detailError && !isNotFoundError(customerQuery.error)) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white shadow-sm">
            <ErrorState
              title="Unable to load customer"
              error={customerQuery.error}
              onRetry={() => customerQuery.refetch()}
            />
          </div>
        </div>
      );
    }

    if (detailMissing || !currentCustomer) {
      return (
        <div className="min-h-full space-y-6 text-slate-900">
          <div className="rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Customer Not Found
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              No customer was found with ID &quot;{id}&quot;.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/collaborator/customers")}
              className="mt-4 inline-flex items-center rounded-xl bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Back to Customer List
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-full space-y-6 text-slate-900">
        <CollaboratorCustomerDetailsView
          customer={currentCustomer}
          onBack={() => navigate("/dashboard/collaborator/customers")}
          onToggleStatus={handleToggleStatus}
          onUpdateCustomer={handleUpdateCustomer}
        />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      <CollaboratorCustomerHeader
        onRegisterCustomer={() => {
          setIsRegisteringView(true);
          navigate("/dashboard/collaborator/customers/register");
        }}
      />

      <div className="space-y-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        <CollaboratorCustomerFilters
          status={status}
          setStatus={(val) => {
            setStatus(val);
            setCurrentPage(1);
          }}
          plan={plan}
          setPlan={(val) => {
            setPlan(val);
            setCurrentPage(1);
          }}
        />

        <CollaboratorCustomerTable
          customers={customersList}
          onActionClick={handleActionClick}
          currentPage={currentPage}
          pageSize={10}
          onPageChange={setCurrentPage}
          isLoading={customersQuery.isLoading}
          isFetching={customersQuery.isFetching && !customersQuery.isLoading}
          error={customersQuery.isError ? customersQuery.error : null}
          onRetry={() => customersQuery.refetch()}
        />
      </div>

      <CollaboratorEditCustomerModal
        isOpen={Boolean(editingCustomer)}
        onClose={() => setEditingCustomer(null)}
        customer={editingCustomer}
        onSave={handleUpdateCustomer}
      />
    </div>
  );
};

export default CollaboratorCustomersView;
