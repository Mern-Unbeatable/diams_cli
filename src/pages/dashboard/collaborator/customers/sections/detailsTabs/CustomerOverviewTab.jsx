import { AlertCircle } from "lucide-react";

const CustomerOverviewTab = ({ customer }) => {
  if (!customer) return null;

  return (
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
            <span className="font-medium text-slate-700">Not activated</span>
          </div>
        </div>
      </div>

      {/* Right Column: KYC Status */}
      <div>
        <h2 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base mb-5">
          KYC Status
        </h2>

        <div className="flex items-center gap-3.5 rounded-xl border border-slate-100 bg-[#f8fafc]/80 p-5 shadow-xs">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <AlertCircle className="h-5 w-5" />
          </div>

          <div>
            <div className="text-sm font-bold text-slate-900">Submitted</div>
            <p className="text-xs text-slate-400">
              Identity verification status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewTab;
