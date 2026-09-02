import { X } from "lucide-react";

const NotificationDetailsModal = ({ isOpen, onClose, notification }) => {
  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Notification {notification.ntfId || "NTF-6101"}
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl mt-0.5">
              {notification.subject || "Network upgrade in Zurich"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details Box */}
        <div className="mt-5 rounded-2xl border border-slate-100/90 bg-white p-5 space-y-4">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Notification Detail
          </span>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Type</span>
              <span className="font-semibold text-slate-900">
                {notification.type}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Audience</span>
              <span className="font-semibold text-slate-900">
                {notification.audience}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Date</span>
              <span className="font-semibold text-slate-900">
                {notification.date}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-normal">Status</span>
              <span className="inline-block rounded-full bg-[#e6f4ea] px-3.5 py-0.5 text-xs font-semibold text-[#137333]">
                {notification.status || "Sent"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-4 pt-1">
              <span className="text-slate-500 font-normal shrink-0">Message</span>
              <span className="font-semibold text-slate-900 text-right leading-relaxed">
                {notification.message || "We are improving 5G capacity this weekend."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailsModal;
