import { Download, Printer } from "lucide-react";
import { BRAND } from "@/config/navigation";

const getStatusBadge = (status) => {
  const isPaid = status?.toLowerCase() === "paid";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isPaid
          ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
          : "bg-amber-50 text-amber-600 border border-amber-200/60"
      }`}
    >
      {status}
    </span>
  );
};

const CollaboratorInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        {/* Dark Navy Branded Header */}
        <div className="bg-[#001738] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-8 w-auto brightness-0 invert"
            />
          </div>

          <div className="text-right">
            <div className="text-sm font-extrabold tracking-wider text-white">
              INVOICE
            </div>
            <div className="font-mono text-xs text-slate-300">
              {invoice.invoiceId}
            </div>
          </div>
        </div>

        {/* Invoice Metadata Body */}
        <div className="p-6 space-y-3.5 text-xs sm:text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Customer</span>
            <span className="font-bold text-slate-900">{invoice.customer}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Plan</span>
            <span className="font-semibold text-slate-800">{invoice.plan}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Amount (ex. VAT)</span>
            <span className="font-semibold text-slate-800">
              {invoice.amountExVat || "CHF 39.90"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">VAT (7.7%)</span>
            <span className="font-semibold text-slate-800">
              {invoice.vat || "CHF 3.03"}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-400 font-medium">Total</span>
            <span className="font-bold text-slate-900">
              {invoice.totalAmount}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Issue Date</span>
            <span className="font-mono font-medium text-slate-700">
              {invoice.issueDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Due Date</span>
            <span className="font-mono font-medium text-slate-700">
              {invoice.dueDate}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-400 font-medium">Status</span>
            {getStatusBadge(invoice.status)}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-slate-50/50 p-6 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-400" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5 text-slate-400" />
              <span>Print Invoice</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#0f1d38] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorInvoiceModal;
