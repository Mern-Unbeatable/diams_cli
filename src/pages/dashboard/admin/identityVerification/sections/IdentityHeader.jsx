import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IDENTITY_STATUS_FILTERS } from "./identityData";

const IdentityHeader = ({ selectedStatus, onSelectStatus }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      {/* Title and Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Identity Verification
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Review uploaded IDs, selfies and customer information from the verification queue.
        </p>
      </div>

      {/* Top Right Status Filter Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <span>{selectedStatus}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 top-full z-20 mt-1.5 min-w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5">
              {IDENTITY_STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onSelectStatus(status);
                    setIsOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3.5 py-2 text-left text-xs font-medium transition-colors ${
                    selectedStatus === status
                      ? "bg-sky-50 font-semibold text-sky-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IdentityHeader;
