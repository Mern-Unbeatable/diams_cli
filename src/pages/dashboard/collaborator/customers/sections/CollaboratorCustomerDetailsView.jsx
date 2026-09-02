import { useState } from "react";
import {
  ChevronRight,
  SquarePen,
  Zap,
  Check,
  AlertCircle,
  Clock,
  Shield,
  ShieldCheck,
  FileText,
  CreditCard,
  Layers,
  ArrowLeft,
  Upload,
} from "lucide-react";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import CollaboratorEditCustomerModal from "./CollaboratorEditCustomerModal";
import CollaboratorSubmitKycModal from "./CollaboratorSubmitKycModal";

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
        <span className="font-semibold text-slate-900">{customer.customer}</span>
      </nav>

      {/* 2. Top Header Card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-7">
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
                {customer.plan || "NovaSky One"} · {customer.simType || "eSIM"} · Joined{" "}
                {customer.registrationDate || "Aug 15, 2026"}
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              <SquarePen className="h-3.5 w-3.5 text-slate-500" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onToggleStatus && onToggleStatus(customer)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
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
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        {/* Common Tabs Component */}
        <DashboardTabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab Content Panels */}
        <div className="mt-8">
          {/* Tab 1: Overview */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Left Column: Service Information */}
              <div>
                <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-5">
                  Service Information
                </h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Current Plan</span>
                    <span className="font-semibold text-slate-900">
                      {customer.plan || "NovaSky One"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">SIM Type</span>
                    <span className="font-semibold text-slate-900">
                      {customer.simType || "eSIM"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="font-medium text-slate-700">
                      {customer.phone || "Not assigned"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-50 pb-2">
                    <span className="text-slate-500">Activation Status</span>
                    <span className="font-semibold text-slate-900">
                      {customer.status || "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Activation Date</span>
                    <span className="font-medium text-slate-700">
                      Not activated
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: KYC Status */}
              <div>
                <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-5">
                  KYC Status
                </h2>

                <div className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-[#f8fafc]/80 p-5 shadow-xs">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                    <AlertCircle className="h-5 w-5" />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Submitted
                    </div>
                    <p className="text-xs text-slate-400">
                      Identity verification status
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Personal Information */}
          {activeTab === "Personal Information" && (
            <div className="grid grid-cols-1 gap-y-7 gap-x-12 sm:grid-cols-2 max-w-4xl py-1">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Full Name
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.customer}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Phone
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.phone || "+41 78 456 78 90"}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Address
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.address || "Via Nassa 8"}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Postal Code
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.postalCode || "6900"}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Email
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.email}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Date of Birth
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.dob || "1978-11-08"}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    City
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.city || "Lugano"}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-slate-400">
                    Country
                  </span>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    {customer.country || "Switzerland"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: KYC */}
          {activeTab === "KYC" && (
            <div className="space-y-6 max-w-4xl py-1">
              {/* Identity Verification Card */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#f8fafc]/80 p-4.5 sm:p-5">
                <div className="flex items-center gap-3.5">
                  <Shield className="h-5 w-5 text-sky-500 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                      Identity Verification
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {customer.kycDocument || "Passport · Expires Dec 2030"}
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                  {customer.kycStatus || "Submitted"}
                </span>
              </div>

              {/* Submit KYC Documents Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsKycModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0080ff] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 sm:text-sm"
                >
                  <Upload className="h-4 w-4" />
                  <span>Submit KYC Documents</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 4: Orders */}
          {activeTab === "Orders" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-4">
                Customer Orders
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="min-w-full divide-y divide-slate-100 text-xs sm:text-sm text-left">
                  <thead className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="px-4 py-3">Plan</th>
                      <th className="px-4 py-3">SIM Type</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-900">
                        #ORD-8921
                      </td>
                      <td className="px-4 py-3.5 font-medium text-slate-900">
                        {customer.plan || "NovaSky One"}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                          {customer.simType || "eSIM"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-500">
                        {customer.registrationDate}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-200/60">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-slate-900">
                        CHF 39.90
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 5: Activations */}
          {activeTab === "Activations" && (
            <div className="max-w-2xl space-y-4">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-4">
                Activation Details
              </h2>

              <div className="space-y-3 rounded-2xl border border-slate-100 bg-[#f8fafc]/60 p-5 text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-slate-100/60 pb-2.5">
                  <span className="text-slate-500">Status</span>
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-600 border border-amber-200/60">
                    {customer.status || "Pending"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100/60 pb-2.5">
                  <span className="text-slate-500">SIM Type</span>
                  <span className="font-semibold text-slate-900">
                    {customer.simType || "eSIM"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100/60 pb-2.5">
                  <span className="text-slate-500">ICCID</span>
                  <span className="font-mono text-slate-700">89410 20000 12345 67890</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Request Date</span>
                  <span className="font-mono text-slate-900">{customer.registrationDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Invoices */}
          {activeTab === "Invoices" && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-4">
                Customer Invoices
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-100">
                <table className="min-w-full divide-y divide-slate-100 text-xs sm:text-sm text-left">
                  <thead className="bg-slate-50/70 text-[11px] font-bold text-slate-400 uppercase">
                    <tr>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="py-3.5 px-4 font-mono font-semibold text-sky-600">
                        {customer.invoice || "INV-9028"}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-500">
                        {customer.registrationDate}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-200/60">
                          Paid
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-semibold text-slate-900">
                        CHF 59.90
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
