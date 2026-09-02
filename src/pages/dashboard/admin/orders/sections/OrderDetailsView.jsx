import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const getStatusBadge = (status) => {
  const norm = String(status).toLowerCase().trim();
  switch (norm) {
    case "pending":
      return "bg-amber-50 text-amber-600 border border-amber-100/80";
    case "identity verification":
    case "verification":
      return "bg-slate-100 text-slate-600 border border-slate-200/80";
    case "approved":
      return "bg-blue-50 text-blue-600 border border-blue-100";
    case "activated":
      return "bg-emerald-50 text-emerald-600 border border-emerald-100";
    case "rejected":
      return "bg-rose-50 text-rose-600 border border-rose-100";
    default:
      return "bg-slate-50 text-slate-700 border border-slate-200";
  }
};

const OrderDetailsView = ({ order, onBack, onApprove, onReject, onSaveNote }) => {
  const [internalNote, setInternalNote] = useState(order?.internalNote || "");

  if (!order) return null;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 transition-colors hover:text-sky-700"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders List</span>
      </button>

      {/* Main Container Card */}
      <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
        {/* Top Header */}
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-sky-600">
            Order Detail
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
            {order.orderDetailId || order.orderId || "ORD-7001"}
          </h1>
        </div>

        {/* 1. CUSTOMER INFORMATION Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Customer Information
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Customer</span>
              <span className="font-semibold text-slate-900">{order.customer}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Order status</span>
              <span
                className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium ${getStatusBadge(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        </div>

        {/* 2. SELECTED PLAN Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Selected Plan
          </h2>

          <div className="space-y-2.5 text-xs sm:text-[13px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Plan</span>
              <span className="font-semibold text-slate-900">{order.plan}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">SIM/eSIM</span>
              <span className="font-medium text-slate-900">{order.simType || "eSIM"}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Activation date</span>
              <span className="font-mono font-medium text-slate-900">
                {order.activationDate || order.orderDate || "2026-02-18"}
              </span>
            </div>
          </div>
        </div>

        {/* 3. DOCUMENTS Section */}
        <div className="space-y-3.5 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Documents
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Doc 1: Swiss ID front */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 transition-colors hover:border-slate-300">
              <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                Swiss ID front
              </h3>
              <p className="mt-1 text-xs text-sky-500 hover:underline cursor-pointer">
                Preview available. Click approve or reject after review.
              </p>
            </div>

            {/* Doc 2: Swiss ID back */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 transition-colors hover:border-slate-300">
              <h3 className="text-xs font-bold text-slate-900 sm:text-sm">
                Swiss ID back
              </h3>
              <p className="mt-1 text-xs text-sky-500 hover:underline cursor-pointer">
                Preview available. Click approve or reject after review.
              </p>
            </div>
          </div>
        </div>

        {/* 4. INTERNAL NOTE Section */}
        <div className="space-y-3 rounded-2xl border border-slate-100/90 bg-[#f8fafc]/60 p-5 sm:p-6">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Internal Note
          </h2>

          <div>
            <input
              type="text"
              placeholder="Write a internal note"
              value={internalNote}
              onChange={(e) => {
                setInternalNote(e.target.value);
                if (onSaveNote) onSaveNote(order.id, e.target.value);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onApprove && onApprove(order)}
            className="rounded-xl bg-[#2ea5ff] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-95 sm:text-sm"
          >
            Approve
          </button>

          <button
            type="button"
            onClick={() => onReject && onReject(order)}
            className="rounded-xl bg-[#e11d48] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-rose-700 active:scale-95 sm:text-sm"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsView;
