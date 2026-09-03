import { useState, useEffect } from "react";
import { X } from "lucide-react";

const RefundPaymentModal = ({ isOpen, onClose, invoice, onConfirmRefund }) => {
  const [paymentAmount, setPaymentAmount] = useState("149");
  const [refundAmount, setRefundAmount] = useState("149");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (invoice) {
      const num = invoice.rawAmount
        ? String(invoice.rawAmount)
        : invoice.amount?.replace(/[^0-9.]/g, "") || "149";
      setPaymentAmount(num);
      setRefundAmount(num);
      setReason("");
    }
  }, [invoice, isOpen]);

  if (!isOpen || !invoice) return null;

  const handleRefund = (e) => {
    e.preventDefault();
    if (onConfirmRefund) {
      onConfirmRefund(invoice.id, { refundAmount, reason });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Refund payment
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Enter a refund amount and reason. Refund amount cannot exceed the
              payment amount.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleRefund} className="mt-5 space-y-4">
          {/* Row 1: Payment Amount & Refund Amount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800">
                Payment amount
              </label>
              <input
                type="text"
                readOnly
                value={paymentAmount}
                className="mt-1.5 w-full rounded-xl border border-slate-100 bg-[#f8fafc] px-4 py-2.5 text-xs font-medium text-slate-700 outline-none sm:text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800">
                Refund amount
              </label>
              <input
                type="text"
                required
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                placeholder="149"
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Row 2: Reason Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-800">
              Reason
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder=""
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-4 text-xs font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm resize-none"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 pt-3" />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 sm:text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#2ea5ff] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
            >
              Confirm Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RefundPaymentModal;
