import { X, Package, Check, Clock, AlertCircle } from "lucide-react";

const CollaboratorOrderDetailsModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-[#0080ff]">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                Order Details
              </h2>
              <p className="font-mono text-xs text-slate-400">
                {order.orderId}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Details Content */}
        <div className="mt-5 space-y-4 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-100 bg-[#f8fafc]/80 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">Customer Name</span>
              <span className="font-bold text-slate-900">{order.customer}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">Customer Email</span>
              <span className="font-medium text-slate-700">{order.email}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">Selected Plan</span>
              <span className="font-bold text-[#0080ff]">{order.plan}</span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">SIM Type</span>
              <span className="inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                {order.simType}
              </span>
            </div>

            {order.iccid && (
              <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
                <span className="text-slate-500">ICCID</span>
                <span className="font-mono text-slate-700">{order.iccid}</span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">Order Date</span>
              <span className="font-mono text-slate-700">
                {order.orderDate}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-100/80 pb-2">
              <span className="text-slate-500">Order Status</span>
              <span className="font-semibold text-slate-900">
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500">Order Total</span>
              <span className="text-base font-extrabold text-slate-900">
                {order.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-slate-800 active:scale-95 cursor-pointer transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorOrderDetailsModal;
