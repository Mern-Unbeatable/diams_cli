import { X } from "lucide-react";

const getBadgeStyle = (status) => {
  const norm = String(status).toLowerCase();
  switch (norm) {
    case "paid":
      return "bg-[#e6f4ea] text-[#137333]";
    case "unpaid":
      return "bg-[#e0f2fe] text-[#0284c7]";
    case "refund":
      return "bg-[#fee2e2] text-[#ef4444]";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

const InvoiceDetailsModal = ({ isOpen, onClose, invoice, onUpdateStatus }) => {
  if (!isOpen || !invoice) return null;

  const handleMarkPaid = () => {
    if (onUpdateStatus) {
      onUpdateStatus(invoice.id, "Paid");
    }
    onClose();
  };

  const handleRefund = () => {
    if (onUpdateStatus) {
      onUpdateStatus(invoice.id, "Refund");
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all sm:p-7 z-10 animate-in zoom-in-95 duration-200 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
              Invoice Details
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl mt-0.5">
              {invoice.invoiceId || "INV-8991"}
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
        <div className="my-5 rounded-xl border border-slate-100/90 bg-slate-50/50 p-5 space-y-3.5">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Invoice
          </span>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">Customer</span>
            <span className="font-semibold text-slate-900">
              {invoice.customerName}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">Amount</span>
            <span className="font-semibold text-slate-900">
              {invoice.amount}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-slate-500">Date</span>
            <span className="font-semibold text-slate-900">{invoice.date}</span>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm pt-0.5">
            <span className="text-slate-500">Status</span>
            <span
              className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold ${getBadgeStyle(
                invoice.status,
              )}`}
            >
              {invoice.status}
            </span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleMarkPaid}
            className="rounded-xl bg-[#2ea5ff] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95 sm:text-sm"
          >
            Mark Payment Received
          </button>

          <button
            type="button"
            onClick={handleRefund}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 sm:text-sm"
          >
            Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
