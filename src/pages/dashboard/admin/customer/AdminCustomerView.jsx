import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import DataTable from "@/Components/dashboard/DataTable";
import {
  CustomerHeader,
  CustomerFilters,
  CustomerDetailsView,
  CUSTOMERS_DATA,
  CUSTOMER_COLUMNS,
  CUSTOMER_ACTIONS,
} from "./sections";

const AdminCustomerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customersList, setCustomersList] = useState(CUSTOMERS_DATA);
  const [status, setStatus] = useState("All");
  const [plan, setPlan] = useState("All");
  const [date, setDate] = useState("");
  const [lineStatus, setLineStatus] = useState("All");

  // Find customer by ID from URL parameter (support both cust-1 and C-1003)
  const currentCustomer = useMemo(() => {
    if (!id) return null;
    return (
      customersList.find(
        (c) =>
          c.id.toLowerCase() === id.toLowerCase() ||
          (c.profileId && c.profileId.toLowerCase() === id.toLowerCase())
      ) || null
    );
  }, [id, customersList]);

  // Filtering Logic
  const filteredCustomers = useMemo(() => {
    return customersList.filter((cust) => {
      // Status Filter
      if (status !== "All" && cust.status.toLowerCase() !== status.toLowerCase()) {
        return false;
      }
      // Plan Filter
      if (plan !== "All" && cust.plan.toLowerCase() !== plan.toLowerCase()) {
        return false;
      }
      // Line Status Filter
      if (
        lineStatus !== "All" &&
        cust.lineStatus.toLowerCase() !== lineStatus.toLowerCase()
      ) {
        return false;
      }
      // Date Filter
      if (date.trim() && !cust.registrationDate.includes(date.trim())) {
        return false;
      }
      return true;
    });
  }, [customersList, status, plan, lineStatus, date]);

  // Clear Filters Handler
  const handleClearFilters = () => {
    setStatus("All");
    setPlan("All");
    setDate("");
    setLineStatus("All");
  };

  // Action Click Handler (See Details navigates to URL with ID)
  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (
      act.includes("detail") ||
      act.includes("see details") ||
      act.includes("view_profile")
    ) {
      navigate(`/dashboard/admin/customer/${row.id}`);
    } else if (act.includes("suspend")) {
      setCustomersList((prev) =>
        prev.map((c) =>
          c.id === row.id
            ? { ...c, status: "Suspended", lineStatus: "Suspended" }
            : c
        )
      );
    } else if (act.includes("active")) {
      setCustomersList((prev) =>
        prev.map((c) =>
          c.id === row.id
            ? { ...c, status: "Active", lineStatus: "Active" }
            : c
        )
      );
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
          : c
      )
    );
  };

  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* If URL contains customer id parameter, render CustomerDetailsView */}
      {id ? (
        currentCustomer ? (
          <CustomerDetailsView
            customer={currentCustomer}
            onBack={() => navigate("/dashboard/admin/customer")}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Customer Not Found</h2>
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
        )
      ) : (
        <>
          {/* 1. Page Header */}
          <CustomerHeader />

          {/* 2. Main White Container Card */}
          <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
            {/* Card Top Title & Subtitle */}
            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-900">
                Customer List
              </h2>
              <p className="mt-0.5 text-xs text-slate-400">
                Supports search, filters, sorting, pagination, row actions, empty, loading and error states.
              </p>
            </div>

            {/* Filters Bar */}
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

            {/* Reusable DataTable with Dropdown Actions & Pagination */}
            <DataTable
              columns={CUSTOMER_COLUMNS}
              data={filteredCustomers}
              actions={CUSTOMER_ACTIONS}
              onActionClick={handleActionClick}
              pageSize={10}
              emptyMessage="No customers found matching the criteria."
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCustomerView;
