import { Shield, Upload } from "lucide-react";

const CustomerKycTab = ({ customer, onSubmitKyc }) => {
  if (!customer) return null;

  return (
    <div className="space-y-6 max-w-4xl py-1">
      {/* Identity Verification Card */}
      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-[#f8fafc]/80 p-4.5 sm:p-5">
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
          onClick={onSubmitKyc}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0080ff] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 sm:text-sm"
        >
          <Upload className="h-4 w-4" />
          <span>Submit KYC Documents</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerKycTab;
