import React from "react";
import { CheckCircle2, Download, ExternalLink, X, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export const PaymentSuccessModal = ({ isOpen, onClose, paymentDetails }) => {
  if (!isOpen || !paymentDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-2xl space-y-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-primary/40 hover:bg-gray-100 hover:text-primary transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Success Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm animate-bounce">
          <CheckCircle2 size={36} />
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-primary">Payment Successful!</h3>
          <p className="mt-1 text-xs text-primary/60">
            Your payment has been processed and confirmed.
          </p>
        </div>

        {/* Receipt Box */}
        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 text-xs space-y-2.5 text-left">
          <div className="flex items-center justify-between">
            <span className="text-primary/50">Amount Paid</span>
            <span className="font-bold text-sm text-primary">CHF {paymentDetails.amount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary/50">Item</span>
            <span className="font-semibold text-primary">{paymentDetails.itemTitle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary/50">Payment Method</span>
            <span className="font-semibold text-primary">{paymentDetails.methodTitle}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary/50">Transaction ID</span>
            <span className="font-mono text-[11px] text-primary/70 font-semibold">
              {paymentDetails.transactionId}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary/50">Date & Time</span>
            <span className="text-primary/70">{paymentDetails.date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-btnPrimary py-3 text-xs font-bold text-white shadow-md hover:bg-btnPrimary/90 transition-colors"
          >
            <Download size={15} />
            <span>Download Receipt</span>
          </button>

          <Link
            to="/dashboard/user/bills"
            onClick={onClose}
            className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
          >
            View all my bills <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};
