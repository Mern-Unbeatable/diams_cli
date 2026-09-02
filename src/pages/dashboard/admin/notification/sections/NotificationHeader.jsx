import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { NOTIFICATION_TYPE_FILTERS } from "./notificationData";

const NotificationHeader = ({
  selectedType,
  onSelectType,
  onCreateNotification,
}) => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="space-y-4">
      {/* Top Header Row with Title and Create Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            Notifications
          </h1>
          <p className="mt-1 text-xs text-slate-500 sm:text-sm">
            Create Email, SMS and Push notifications, draft messages, send with confirmation and view history.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateNotification}
          className="rounded-xl bg-[#2ea5ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm"
        >
          Create Notifications
        </button>
      </div>

      {/* Filter Dropdown on Right */}
      <div className="flex justify-end">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsTypeOpen(!isTypeOpen)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:text-sm"
          >
            <span>{selectedType === "All Types" ? "Notifications Type" : selectedType}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {isTypeOpen && (
            <div className="absolute right-0 top-full z-20 mt-1.5 min-w-40 rounded-xl border border-slate-100 bg-white p-1 shadow-lg ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
              {NOTIFICATION_TYPE_FILTERS.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onSelectType(type);
                    setIsTypeOpen(false);
                  }}
                  className={`flex w-full items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    selectedType === type
                      ? "bg-sky-50 text-sky-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationHeader;
