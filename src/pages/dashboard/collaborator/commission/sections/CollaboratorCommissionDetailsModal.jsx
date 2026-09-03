import { X } from "lucide-react";

const CollaboratorCommissionDetailsModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-6 sm:p-7 shadow-2xl transition-all z-10 animate-in zoom-in-95 duration-200 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            Commission Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details Rows */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Customer</span>
            <span className="font-bold text-slate-900">{item.customer}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Order ID</span>
            <span className="font-mono font-semibold text-slate-800">
              {item.order}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Plan</span>
            <span className="font-semibold text-slate-800">{item.plan}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Commission Amount</span>
            <span className="font-bold text-slate-900">{item.commission}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Commission Status</span>
            <span className="font-semibold text-slate-800">{item.status}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Date</span>
            <span className="font-mono font-semibold text-slate-800">
              {item.date}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0080ff] px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-600 active:scale-95 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorCommissionDetailsModal;
