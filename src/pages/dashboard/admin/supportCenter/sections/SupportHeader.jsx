import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  SUPPORT_PRIORITY_FILTERS,
  SUPPORT_STATUS_FILTERS,
} from "./supportData";

const SupportHeader = ({
  selectedPriority,
  onSelectPriority,
  selectedStatus,
  onSelectStatus,
}) => {
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const priorityRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target)) {
        setIsPriorityOpen(false);
      }
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
          Support center
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          Keep customer conversations moving with clear ownership and status.
        </p>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Priority Filter */}
        <div className="relative" ref={priorityRef}>
          <button
            type="button"
            onClick={() => {
              setIsPriorityOpen(!isPriorityOpen);
              setIsStatusOpen(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            <span>{selectedPriority}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {isPriorityOpen && (
            <div className="absolute right-0 top-full z-20 mt-1.5 min-w-36 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
              {SUPPORT_PRIORITY_FILTERS.map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => {
                    onSelectPriority(priority);
                    setIsPriorityOpen(false);
                  }}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    selectedPriority === priority
                      ? "bg-sky-50 text-sky-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="relative" ref={statusRef}>
          <button
            type="button"
            onClick={() => {
              setIsStatusOpen(!isStatusOpen);
              setIsPriorityOpen(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            <span>{selectedStatus}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {isStatusOpen && (
            <div className="absolute right-0 top-full z-20 mt-1.5 min-w-36 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
              {SUPPORT_STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onSelectStatus(status);
                    setIsStatusOpen(false);
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
    </div>
  );
};

export default SupportHeader;
