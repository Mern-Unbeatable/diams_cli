import { X } from "lucide-react";

const ActivityDetailsModal = ({ isOpen, onClose, log }) => {
  if (!isOpen || !log) return null;

  const logId =
    log.logId || `AUD-${log.id ? log.id.replace("log-", "900") : "9005"}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
              AUDIT LOG {logId}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl mt-0.5">
              {log.action}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Complete Activity Information Box */}
        <div className="mt-6 rounded-xl border border-slate-100 bg-[#f8fbfe] p-6 sm:p-7 space-y-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#0284c7]">
            COMPLETE ACTIVITY INFORMATION
          </span>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Date & Time</span>
              <span className="font-semibold text-slate-900">
                {log.dateTime}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Admin</span>
              <span className="font-semibold text-slate-900">{log.admin}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Action</span>
              <span className="font-semibold text-slate-900">{log.action}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Module</span>
              <span className="font-semibold text-slate-900">{log.module}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Target</span>
              <span className="font-semibold text-slate-900">{log.target}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">
                IP/Activity information
              </span>
              <span className="font-semibold text-slate-900">
                {log.ipActivity}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Status</span>
              <span
                className={`inline-block rounded-full px-3.5 py-0.5 text-xs font-semibold ${
                  log.status === "Success"
                    ? "bg-[#e6f4ea] text-[#137333]"
                    : "bg-[#fee2e2] text-[#ef4444]"
                }`}
              >
                {log.status}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 pt-1">
              <span className="text-slate-500 font-normal shrink-0">
                Details
              </span>
              <span className="font-semibold text-slate-900 text-right leading-relaxed">
                {log.details || "Updated roaming feature copy."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
