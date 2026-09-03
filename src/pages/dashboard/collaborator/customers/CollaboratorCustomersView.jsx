import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import {
  CollaboratorCustomerHeader,
  CollaboratorCustomerFilters,
  CollaboratorCustomerTable,
  CollaboratorCustomerDetailsView,
  CollaboratorRegisterCustomerView,
  CollaboratorEditCustomerModal,
  COLLABORATOR_CUSTOMERS_DATA,
} from "./sections";

const CollaboratorCustomersView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customersList, setCustomersList] = useState(
    COLLABORATOR_CUSTOMERS_DATA,
  );
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [isRegisteringView, setIsRegisteringView] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const isRegisterMode = id === "register" || isRegisteringView;

  // Find customer by ID from URL parameter
  const currentCustomer = useMemo(() => {
    if (!id || id === "register") return null;
    return (
      customersList.find(
        (c) =>
          c.id.toLowerCase() === id.toLowerCase() ||
          (c.profileId && c.profileId.toLowerCase() === id.toLowerCase()),
      ) || null
    );
  }, [id, customersList]);

  // Filtering Logic
  const filteredCustomers = useMemo(() => {
    return customersList.filter((cust) => {
      // Status Filter
      if (
        status !== "All" &&
        cust.status.toLowerCase() !== status.toLowerCase()
      ) {
        return false;
      }
      // Plan Filter
      if (plan !== "All" && cust.plan.toLowerCase() !== plan.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [customersList, status, plan]);

  // Row Action Click Handler
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("detail") || act.includes("see details")) {
      navigate(`/dashboard/collaborator/customers/${row.id}`);
    } else if (act.includes("edit")) {
      setEditingCustomer(row);
    } else if (act.includes("order")) {
      navigate("/dashboard/collaborator/orders");
    } else if (act.includes("activation")) {
      navigate("/dashboard/collaborator/orders");
    }
  };

  // Toggle status from details view
  const handleToggleStatus = (cust) => {
    const isSuspended = cust.status?.toLowerCase() === "suspended";
    const nextStatus = isSuspended ? "Active" : "Suspended";
    setCustomersList((prev) =>
      prev.map((c) =>
        c.id === cust.id
          ? { ...c, status: nextStatus, lineStatus: nextStatus }
          : c,
      ),
    );
  };

  // Update customer details from edit modal
  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomersList((prev) =>
      prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)),
    );
  };

  // Register new customer handler
  const handleRegisterSuccess = (newCustomer) => {
    setCustomersList((prev) => [newCustomer, ...prev]);
    setIsRegisteringView(false);
    navigate(`/dashboard/collaborator/customers/${newCustomer.id}`);
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Register Customer Multi-Step Page View */}
      {isRegisterMode ? (
        <CollaboratorRegisterCustomerView
          onBack={() => {
            setIsRegisteringView(false);
            navigate("/dashboard/collaborator/customers");
          }}
          onRegisterSuccess={handleRegisterSuccess}
        />
      ) : id ? (
        /* 2. Customer Details Profile View */
        currentCustomer ? (
          <CollaboratorCustomerDetailsView
            customer={currentCustomer}
            onBack={() => navigate("/dashboard/collaborator/customers")}
            onToggleStatus={handleToggleStatus}
            onUpdateCustomer={handleUpdateCustomer}
          />
        ) : (
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
        )
      ) : (
        /* 3. Main Customer Table List View */
        <>
          {/* Header */}
          <CollaboratorCustomerHeader
            onRegisterCustomer={() => {
              setIsRegisteringView(true);
              navigate("/dashboard/collaborator/customers/register");
            }}
          />

          {/* Main Table Card Container */}
          <div className="space-y-6 rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
            {/* Filters Bar */}
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

            {/* Customer Table with Action Menu & Pagination */}
            <CollaboratorCustomerTable
              customers={filteredCustomers}
              onActionClick={handleActionClick}
              currentPage={currentPage}
              pageSize={10}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Edit Customer Modal */}
          <CollaboratorEditCustomerModal
            isOpen={Boolean(editingCustomer)}
            onClose={() => setEditingCustomer(null)}
            customer={editingCustomer}
            onSave={handleUpdateCustomer}
          />
        </>
      )}
    </div>
  );
};

export default CollaboratorCustomersView;
