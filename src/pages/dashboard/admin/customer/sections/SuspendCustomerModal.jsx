import { X } from "lucide-react";

const SuspendCustomerModal = ({ isOpen, onClose, customer, onConfirm }) => {
  if (!isOpen || !customer) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(customer);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              Suspend customer
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Are you sure you want to suspend this customer?
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-100 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Warning / Audit Notice Box */}
        <div className="my-5 rounded-xl border border-[#ffedd5] bg-[#fff7ed] p-4">
          <p className="text-xs font-medium text-[#c2410c] sm:text-sm">
            This action will be recorded in NovaSky audit logs.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-xl bg-[#ea580c] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-orange-700 active:scale-95 sm:text-sm"
          >
            Suspend Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendCustomerModal;
