import React from "react";
import { X, Download, Printer, CheckCircle2, ShieldCheck, FileText } from "lucide-react";

export const InvoiceDetailsModal = ({ isOpen, onClose, bill }) => {
  if (!isOpen || !bill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <FileText size={20} />
            </span>
            <div>
              <h3 className="text-base font-bold text-primary">Invoice Details</h3>
              <p className="text-xs text-primary/60">{bill.invoiceNumber || "INV-2024-07-8891"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Invoice Summary Info */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50/80 p-4 border border-gray-100 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/40">
              Billing Period
            </span>
            <p className="font-semibold text-primary mt-0.5">{bill.month || "July 2024"}</p>
            <p className="text-[11px] text-primary/60">{bill.period || "Jul 01 - Jul 31, 2024"}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/40">
              Payment Status
            </span>
            <div className="mt-0.5">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                <CheckCircle2 size={13} />
                {bill.status || "Paid"}
              </span>
            </div>
            <p className="text-[11px] text-primary/60">{bill.issueDate || "July 10, 2024"}</p>
          </div>
        </div>

        {/* Breakdown Items Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary/50">
            Charges Breakdown
          </h4>
          <div className="rounded-xl border border-gray-100 divide-y divide-gray-100 overflow-hidden text-xs">
            <div className="flex items-center justify-between p-3 bg-white">
              <div>
                <p className="font-semibold text-primary">
                  {bill.breakdown?.planName || "Nova Unlimited 5G (Switzerland + EU)"}
                </p>
                <p className="text-[11px] text-primary/50">Monthly subscription fee</p>
              </div>
              <span className="font-bold text-primary">
                CHF {bill.breakdown?.baseAmount || "29.90"}
              </span>
            </div>

            {bill.breakdown?.options?.map((opt, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white">
                <div>
                  <p className="font-semibold text-primary">{opt.name}</p>
                  <p className="text-[11px] text-primary/50">Add-on service</p>
                </div>
                <span className="font-bold text-primary">CHF {opt.amount}</span>
              </div>
            ))}

            <div className="flex items-center justify-between p-3 bg-gray-50/50">
              <span className="text-primary/70">VAT ({bill.breakdown?.vatPercent || "8.1%"})</span>
              <span className="font-medium text-primary">
                CHF {bill.breakdown?.vatAmount || "2.62"}
              </span>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-blue-50/40">
              <span className="font-bold text-sm text-primary">Total Amount</span>
              <span className="font-extrabold text-base text-primary">
                CHF {bill.amount || "34.90"}
              </span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50/70 p-3 border border-emerald-100 text-xs text-emerald-800">
          <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
          <span>Official Swiss VAT invoice compliant with federal tax regulations.</span>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
          >
            <Printer size={14} />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
