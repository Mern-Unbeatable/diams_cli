import { useState } from "react";
import { ChevronRight, SquarePen, Zap, Check } from "lucide-react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import CollaboratorEditCustomerModal from "./CollaboratorEditCustomerModal";
import CollaboratorSubmitKycModal from "./CollaboratorSubmitKycModal";
import {
  CustomerOverviewTab,
  CustomerPersonalInfoTab,
  CustomerKycTab,
  CustomerOrdersTab,
  CustomerActivationsTab,
  CustomerInvoicesTab,
} from "./detailsTabs";

const CollaboratorCustomerDetailsView = ({
  customer,
  onBack,
  onToggleStatus,
  onUpdateCustomer,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  if (!customer) return null;

  // Compute initials for avatar (e.g. "Marco Rossi" -> "MR")
  const getInitials = (name) => {
    if (!name) return "CU";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const tabs = [
    "Overview",
    "Personal Information",
    "KYC",
    "Orders",
    "Activations",
    "Invoices",
  ];

  // Stepper definition
  const steps = [
    {
      id: 1,
      title: "Registered",
      date: customer.registrationDate || "Aug 15, 2026",
      isCompleted: true,
    },
    {
      id: 2,
      title: "KYC Submitted",
      date: "Aug 12, 2026",
      isCompleted: true,
    },
    {
      id: 3,
      title: "Plan Selected",
      date: "Aug 12, 2026",
      isCompleted: true,
    },
    {
      id: 4,
      title: "SIM Ordered",
      date: "Aug 12, 2026",
      isCompleted: false,
    },
    {
      id: 5,
      title: "Activation Started",
      date: "—",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Activated",
      date: "—",
      isCompleted: false,
    },
  ];

  return (
    <div className="space-y-5">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="hover:text-slate-900 transition-colors cursor-pointer"
        >
          My Customers
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-900">
          {customer.customer}
        </span>
      </nav>

      {/* 2. Top Header Card */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Left Avatar & Info */}
          <div className="flex items-start gap-4">
            {/* Blue Avatar */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0080ff] text-sm font-bold text-white shadow-sm">
              {getInitials(customer.customer)}
            </div>

            {/* Customer Details */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  {customer.customer}
                </h1>

                {/* Status Badges */}
                <span className="inline-flex items-center rounded-full border border-amber-200/60 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600">
                  {customer.status || "Pending"}
                </span>

                <span className="inline-flex items-center rounded-full border border-sky-200/60 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-600">
                  Submitted
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {customer.email} · {customer.phone || "+41 78 456 78 90"}
              </p>

              <p className="text-xs text-slate-400">
                {customer.plan || "NovaSky One"} · {customer.simType || "eSIM"}{" "}
                · Joined {customer.registrationDate || "Aug 15, 2026"}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
            >
              <SquarePen className="h-3.5 w-3.5 text-slate-500" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleStatus && onToggleStatus(customer)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95 cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>Activation</span>
            </button>
          </div>
        </div>

        {/* Stepper / Registration & Activation Flow */}
        <div className="mt-8 border-t border-slate-100/90 pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div
                key={step.id}
                className="flex flex-1 items-center last:flex-initial"
              >
                <div className="relative flex flex-col items-center">
                  {/* Step Circle Indicator */}
                  {step.isCompleted ? (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-white shadow-sm">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[11px] font-semibold text-slate-400">
                      {step.id}
                    </div>
                  )}

                  {/* Step Text Labels */}
                  <div className="absolute top-7 w-28 text-center">
                    <span className="block text-[11px] font-semibold text-slate-800 leading-tight">
                      {step.title}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {step.date}
                    </span>
                  </div>
                </div>

                {/* Connecting Line Between Steps */}
                {idx < steps.length - 1 && (
                  <div
                    className={`h-[2px] flex-1 mx-2 ${
                      step.isCompleted && steps[idx + 1].isCompleted
                        ? "bg-[#10b981]"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Spacer for bottom labels of stepper */}
          <div className="h-10" />
        </div>
      </div>

      {/* 3. Main Bottom Card with Navigation Tabs */}
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        {/* Common Tabs Component */}
        <DashboardTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab Content Panels handled in individual components */}
        <div className="mt-8">
          {activeTab === "Overview" && (
            <CustomerOverviewTab customer={customer} />
          )}

          {activeTab === "Personal Information" && (
            <CustomerPersonalInfoTab customer={customer} />
          )}

          {activeTab === "KYC" && (
            <CustomerKycTab
              customer={customer}
              onSubmitKyc={() => setIsKycModalOpen(true)}
            />
          )}

          {activeTab === "Orders" && <CustomerOrdersTab />}

          {activeTab === "Activations" && <CustomerActivationsTab />}

          {activeTab === "Invoices" && <CustomerInvoicesTab />}
        </div>
      </div>

      {/* Edit Customer Modal */}
      <CollaboratorEditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        customer={customer}
        onSave={(updated) => {
          if (onUpdateCustomer) onUpdateCustomer(updated);
        }}
      />

      {/* Submit KYC Modal */}
      <CollaboratorSubmitKycModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        customer={customer}
        onSubmit={(updated) => {
          if (onUpdateCustomer) onUpdateCustomer(updated);
        }}
      />
    </div>
  );
};

export default CollaboratorCustomerDetailsView;
