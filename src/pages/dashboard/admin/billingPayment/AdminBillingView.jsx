import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import DataTable from "@/Components/dashboard/DataTable";
import {
  useBillingList,
  useCreateBilling,
  useUpdateBilling,
} from "@/features/dash/admin/billing";
import { unwrapList } from "@/lib/query/unwrap";
import { useMutationFeedback } from "@/hooks/useMutationFeedback";
import {
  BillingHeader,
  BillingKpiCards,
  GenerateInvoiceModal,
  InvoiceDetailsModal,
  RefundPaymentModal,
  BILLING_STATUS_FILTERS,
  BILLING_ACTIONS,
} from "./sections";

const getBillingStatusBadge = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "paid":
      return "bg-[#e6f4ea] text-[#137333]";
    case "unpaid":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "refund":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const AdminBillingView = () => {
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const listFilters =
    selectedStatus === "All Statuses" ? {} : { status: selectedStatus };

  const billingQuery = useBillingList(listFilters);
  const createBilling = useCreateBilling();
  const updateBilling = useUpdateBilling();

  useMutationFeedback(createBilling, {
    successMessage: "Invoice created.",
    errorTitle: "Create failed",
  });
  useMutationFeedback(updateBilling, {
    successMessage: "Invoice updated.",
    errorTitle: "Update failed",
  });

  const invoices = useMemo(
    () => unwrapList(billingQuery.data),
    [billingQuery.data],
  );

  // Unfiltered list for KPIs — refetch without status when needed
  const allBillingQuery = useBillingList({});
  const allInvoices = useMemo(
    () => unwrapList(allBillingQuery.data),
    [allBillingQuery.data],
  );

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const totalRevenue = useMemo(() => {
    const sum = allInvoices
      .filter((inv) => inv.status.toLowerCase() === "paid")
      .reduce((acc, curr) => acc + (curr.rawAmount || 0), 0);
    return sum.toFixed(2);
  }, [allInvoices]);

  const paidCount = useMemo(
    () =>
      allInvoices.filter((inv) => inv.status.toLowerCase() === "paid").length,
    [allInvoices],
  );

  const unpaidCount = useMemo(
    () =>
      allInvoices.filter((inv) => inv.status.toLowerCase() === "unpaid")
        .length,
    [allInvoices],
  );

  const columns = useMemo(
    () => [
      {
        key: "invoiceId",
        label: "Invoice ID",
        render: (row) => (
          <span className="font-medium text-slate-700">{row.invoiceId}</span>
        ),
      },
      {
        key: "customerName",
        label: "Customer Name",
        render: (row) => (
          <span className="font-medium text-slate-900">{row.customerName}</span>
        ),
      },
      {
        key: "amount",
        label: "Amount",
        render: (row) => (
          <span className="font-medium text-slate-900">{row.amount}</span>
        ),
      },
      {
        key: "date",
        label: "Date",
        render: (row) => (
          <span className="text-slate-600">{row.date}</span>
        ),
      },
      {
        key: "status",
        label: "Status",
        render: (row) => (
          <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getBillingStatusBadge(
              row.status,
            )}`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "action",
        label: "Action",
        align: "center",
      },
    ],
    [],
  );

  const handleActionClick = (actionName, row) => {
    const act = String(actionName).toLowerCase();
    if (act.includes("detail") || act === "details") {
      setSelectedInvoice(row);
      setIsDetailsModalOpen(true);
    } else if (act.includes("generate")) {
      setIsGenerateModalOpen(true);
    } else if (act.includes("refund")) {
      setSelectedInvoice(row);
      setIsRefundModalOpen(true);
    }
  };

  const handleUpdateInvoiceStatus = (invoiceId, newStatus) => {
    if (updateBilling.isPending) return;
    updateBilling.mutate({ id: invoiceId, payload: { status: newStatus } });
    if (selectedInvoice && selectedInvoice.id === invoiceId) {
      setSelectedInvoice((prev) =>
        prev ? { ...prev, status: newStatus } : null,
      );
    }
  };

  const handleConfirmRefund = (invoiceId) => {
    handleUpdateInvoiceStatus(invoiceId, "Refund");
  };

  const handleSaveInvoice = (newInvoice) => {
    if (createBilling.isPending) return;
    createBilling.mutate(newInvoice);
  };

  return (
    <div className="min-h-full space-y-8 text-slate-900 font-sans">
      <BillingHeader onGenerateInvoice={() => setIsGenerateModalOpen(true)} />

      <BillingKpiCards
        revenue={totalRevenue > 0 ? totalRevenue : "328.70"}
        paidCount={paidCount}
        unpaidCount={unpaidCount}
      />

      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 top-full z-20 mt-1.5 min-w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
                {BILLING_STATUS_FILTERS.map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsFilterOpen(false);
                    }}
                    className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      selectedStatus === status
                        ? "bg-sky-50 text-sky-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={invoices}
          actions={BILLING_ACTIONS}
          onActionClick={handleActionClick}
          pageSize={10}
          emptyMessage="No invoices found matching the selected filter."
          isLoading={billingQuery.isLoading}
          isFetching={billingQuery.isFetching && !billingQuery.isLoading}
          error={billingQuery.isError ? billingQuery.error : null}
          onRetry={() => billingQuery.refetch()}
        />
      </div>

      <GenerateInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onSave={handleSaveInvoice}
      />

      <InvoiceDetailsModal
        isOpen={isDetailsModalOpen}
        invoice={selectedInvoice}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedInvoice(null);
        }}
        onUpdateStatus={handleUpdateInvoiceStatus}
      />

      <RefundPaymentModal
        isOpen={isRefundModalOpen}
        invoice={selectedInvoice}
        onClose={() => {
          setIsRefundModalOpen(false);
          setSelectedInvoice(null);
        }}
        onConfirmRefund={handleConfirmRefund}
      />
    </div>
  );
};

export default AdminBillingView;
