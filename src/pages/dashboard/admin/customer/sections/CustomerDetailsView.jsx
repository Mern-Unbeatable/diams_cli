import { ArrowLeft } from "lucide-react";

const getBadgeStyle = (status) => {
  const norm = String(status).toLowerCase().trim();
  switch (norm) {
    case "active":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "suspended":
      return "bg-rose-50 text-rose-700 border-rose-100";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-100";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const CustomerDetailsView = ({ customer, onBack, onToggleStatus }) => {
  if (!customer) return null;

  const isSuspended = customer.status?.toLowerCase() === "suspended";

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Customer List</span>
      </button>

      {/* Main Profile Container Card */}
      <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        {/* Top Header */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-sky-600">
            Customer Profile {customer.profileId || "C-1003"}
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            {customer.customer}
          </h1>
        </div>

        {/* 1. PERSONAL INFORMATION Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/70 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Personal Information
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Email</span>
              <span className="font-medium text-slate-900">{customer.email}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Phone</span>
              <span className="font-mono font-medium text-slate-900">{customer.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Customer type</span>
              <span className="font-medium text-slate-900">{customer.customerType || "Private"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Registration date</span>
              <span className="font-mono font-medium text-slate-900">{customer.registrationDate}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status</span>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getBadgeStyle(
                  customer.status
                )}`}
              >
                {customer.status}
              </span>
            </div>
          </div>
        </div>

        {/* 2. ACTIVE LINE Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/70 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Active Line
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Line status</span>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getBadgeStyle(
                  customer.lineStatus
                )}`}
              >
                {customer.lineStatus}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Number</span>
              <span className="font-mono font-medium text-slate-900">{customer.phone}</span>
            </div>
          </div>
        </div>

        {/* 3. CURRENT PLAN Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/70 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Current Plan
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Plan</span>
              <span className="font-medium text-slate-900">{customer.plan}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Usage</span>
              <span className="font-medium text-slate-900">{customer.usage || "11.2 GB of 40 GB"}</span>
            </div>
          </div>
        </div>

        {/* 4. INVOICES Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/70 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Invoices
          </h2>

          <div className="flex items-center justify-between text-xs sm:text-[13px]">
            <span className="text-slate-500">Invoice</span>
            <button
              type="button"
              className="font-medium text-sky-500 transition-colors hover:text-sky-600 hover:underline"
            >
              {customer.invoice || "INV-9028"}
            </button>
          </div>
        </div>

        {/* 5. PAYMENT HISTORY Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/70 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Payment History
          </h2>

          <div className="flex items-center justify-between text-xs sm:text-[13px]">
            <span className="text-slate-500">Payment</span>
            <span className="font-medium text-slate-900">
              {customer.paymentHistory || `CHF 49.90 paid on ${customer.registrationDate}`}
            </span>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            className="rounded-xl bg-[#2563eb] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
          >
            Edit Customer
          </button>

          <button
            type="button"
            onClick={() => onToggleStatus && onToggleStatus(customer)}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 sm:text-sm"
          >
            {isSuspended ? "Activate Customer" : "Suspend Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsView;
