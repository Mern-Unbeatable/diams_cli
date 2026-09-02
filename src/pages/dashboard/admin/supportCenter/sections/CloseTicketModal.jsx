import { X } from "lucide-react";

const CloseTicketModal = ({ isOpen, onClose, ticket, onConfirmClose }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (onConfirmClose) {
      onConfirmClose(ticket?.id);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Close ticket
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Confirm that this support ticket is resolved and should be closed.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Audit Log Notice Box */}
        <div className="my-6 rounded-2xl border border-amber-200/80 bg-[#fffaf5] p-4">
          <p className="text-xs sm:text-sm font-medium text-[#c2410c]">
            This action will be recorded in NovaSky audit logs.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 sm:text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl bg-[#f97316] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-95 sm:text-sm"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseTicketModal;
