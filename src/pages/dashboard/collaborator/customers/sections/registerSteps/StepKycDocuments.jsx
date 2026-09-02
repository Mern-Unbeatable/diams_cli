import { useState } from "react";
import { Upload, Clock, ChevronDown } from "lucide-react";

const DOCUMENT_TYPES = [
  "National ID Card",
  "Passport",
  "Residence Permit",
  "Driver's License",
];

const StepKycDocuments = ({ formData, onChange, onNext, onPrev }) => {
  const [fileName, setFileName] = useState(formData.kycFileName || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-base font-bold tracking-tight text-slate-900">
        Step 2: KYC Documents
      </h2>

      <div className="space-y-5">
        {/* Document Type Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Document Type
          </label>
          <div className="relative">
            <select
              value={formData.kycType || "National ID Card"}
              onChange={(e) => onChange("kycType", e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-xs sm:text-sm font-medium text-slate-900 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/90 bg-white py-12 px-6 text-center hover:border-sky-400 transition-colors">
          <Upload className="h-7 w-7 text-sky-400 mb-2" />
          <p className="text-sm font-semibold text-slate-800">
            {fileName || "Drag & Drop or Browse Files"}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            JPG, PNG, PDF up to 10 MB
          </p>

          <input
            type="file"
            id="kyc-doc-file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const name = e.target.files[0].name;
                setFileName(name);
                onChange("kycFileName", name);
              }
            }}
          />
          <label
            htmlFor="kyc-doc-file"
            className="mt-4 inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 cursor-pointer transition-colors"
          >
            Browse Files
          </label>
        </div>

        {/* Yellow KYC Status Banner */}
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-xs">
          <Clock className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="text-amber-600 font-medium">KYC Status:</span>
          <span className="font-bold text-amber-700">Pending Submission</span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
        >
          &lt; Back
        </button>

        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0080ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
        >
          <span>Continue</span>
          <span>&gt;</span>
        </button>
      </div>
    </form>
  );
};

export default StepKycDocuments;
