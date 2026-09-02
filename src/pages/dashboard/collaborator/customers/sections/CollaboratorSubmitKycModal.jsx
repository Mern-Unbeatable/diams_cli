import { useState } from "react";
import { X, Upload, Shield, ChevronDown } from "lucide-react";

const DOCUMENT_TYPES = [
  "Passport",
  "Swiss National ID",
  "Residence Permit",
  "Driver's License",
];

const CollaboratorSubmitKycModal = ({ isOpen, onClose, customer, onSubmit }) => {
  const [docType, setDocType] = useState("Passport");
  const [expiry, setExpiry] = useState("2030-12-31");
  const [fileName, setFileName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...customer,
        kycDocument: `${docType} · Expires Dec ${expiry.split("-")[0] || "2030"}`,
        kycStatus: "Submitted",
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Submit KYC Documents
              </h2>
              <p className="text-xs text-slate-400">
                Upload identity verification documents for {customer?.customer}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Document Type
            </label>
            <div className="relative">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-8 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Document Expiry Date
            </label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Document File (PDF, PNG, JPG)
            </label>
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center hover:border-sky-500 transition-colors cursor-pointer">
              <Upload className="h-6 w-6 text-slate-400 mb-2" />
              <p className="text-xs font-medium text-slate-600">
                {fileName || "Click or drag document to upload"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Up to 10MB in size
              </p>
              <input
                type="file"
                className="hidden"
                id="kyc-file"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
              />
              <label
                htmlFor="kyc-file"
                className="mt-3 inline-flex items-center rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer"
              >
                Browse File
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#0080ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95"
            >
              Upload & Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollaboratorSubmitKycModal;
