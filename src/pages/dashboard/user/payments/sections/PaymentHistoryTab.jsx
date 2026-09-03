import React, { useState } from "react";
import {
  TrendingUp,
  Clock,
  AlertCircle,
  CreditCard,
  Search,
  ChevronDown,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import { USER_PAYMENTS } from "@/config/userPayments";

export const PaymentHistoryTab = ({
  paymentHistory: propHistory,
  onViewInvoice,
}) => {
  const { historyStats, paymentHistory: defaultHistory } = USER_PAYMENTS;
  const historyData = propHistory?.length ? propHistory : defaultHistory;

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const filteredHistory = historyData.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (item.invoice || item.id || "").toLowerCase().includes(term) ||
      (item.method || "").toLowerCase().includes(term) ||
      (item.date || "").toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" ||
      (item.status || "").toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const displayedRows = showAll ? filteredHistory : filteredHistory.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* 1. Top 4 Metric / Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: TOTAL PAID */}
        <div className="rounded-xl border border-gray-100/90 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              TOTAL PAID
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/60">
              <TrendingUp size={14} />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {historyStats.totalPaid}
            </p>
            <p className="text-xs text-primary/50 mt-0.5">
              {historyStats.totalPaidPeriod}
            </p>
          </div>
        </div>

        {/* Card 2: PENDING PAYMENTS */}
        <div className="rounded-xl border border-gray-100/90 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              PENDING PAYMENTS
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-100/60">
              <Clock size={14} />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {historyStats.pendingCount}
            </p>
            <p className="text-xs text-primary/50 mt-0.5">
              {historyStats.pendingSub}
            </p>
          </div>
        </div>

        {/* Card 3: FAILED PAYMENTS */}
        <div className="rounded-xl border border-gray-100/90 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              FAILED PAYMENTS
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-500 border border-rose-100/60">
              <AlertCircle size={14} />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {historyStats.failedCount}
            </p>
            <p className="text-xs text-primary/50 mt-0.5">
              {historyStats.failedSub}
            </p>
          </div>
        </div>

        {/* Card 4: LAST PAYMENT */}
        <div className="rounded-xl border border-gray-100/90 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              LAST PAYMENT
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-btnPrimary border border-sky-100/60">
              <CreditCard size={14} />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              {historyStats.lastPaymentAmount}
            </p>
            <p className="text-xs text-primary/50 mt-0.5">
              {historyStats.lastPaymentSub}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Main Payment History Section */}
      <section className="rounded-xl border border-gray-100/90 bg-white p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-primary">
            Payment history
          </h3>
          <p className="text-xs text-primary/60 mt-0.5">
            Search, filter and download your NovaSky receipts.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40"
            />
            <input
              type="text"
              placeholder="Search payments, invoices or methods"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200/80 bg-gray-50/50 pl-10 pr-4 py-2.5 text-xs text-primary placeholder-primary/35 focus:bg-white focus:border-btnPrimary focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Date Filter */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsDateOpen(!isDateOpen);
                  setIsStatusOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white px-4 py-2.5 text-xs font-semibold text-primary hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
              >
                <span>
                  {dateFilter === "all"
                    ? "All dates"
                    : dateFilter === "2026"
                      ? "Year 2026"
                      : "Year 2025"}
                </span>
                <ChevronDown size={14} className="text-primary/40" />
              </button>

              {isDateOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl z-20 text-xs text-primary animate-in fade-in duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setDateFilter("all");
                      setIsDateOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium"
                  >
                    All dates
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDateFilter("2026");
                      setIsDateOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium"
                  >
                    Year 2026
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDateFilter("2025");
                      setIsDateOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium"
                  >
                    Year 2025
                  </button>
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsStatusOpen(!isStatusOpen);
                  setIsDateOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white px-4 py-2.5 text-xs font-semibold text-primary hover:border-gray-300 transition-colors cursor-pointer shadow-sm"
              >
                <span>
                  {statusFilter === "all"
                    ? "All statuses"
                    : statusFilter === "paid"
                      ? "Paid"
                      : statusFilter === "pending"
                        ? "Pending"
                        : "Failed"}
                </span>
                <ChevronDown size={14} className="text-primary/40" />
              </button>

              {isStatusOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl z-20 text-xs text-primary animate-in fade-in duration-150">
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("all");
                      setIsStatusOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium"
                  >
                    All statuses
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("paid");
                      setIsStatusOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium text-emerald-600"
                  >
                    Paid
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("pending");
                      setIsStatusOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium text-amber-600"
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStatusFilter("failed");
                      setIsStatusOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 font-medium text-rose-500"
                  >
                    Failed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-primary/40">
                <th className="pb-3 font-bold">INVOICE</th>
                <th className="pb-3 font-bold">DATE</th>
                <th className="pb-3 font-bold">AMOUNT</th>
                <th className="pb-3 font-bold">METHOD</th>
                <th className="pb-3 font-bold">STATUS</th>
                <th className="pb-3 font-bold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {displayedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-xs text-primary/50"
                  >
                    No payment history matches your search or filters.
                  </td>
                </tr>
              ) : (
                displayedRows.map((item) => (
                  <tr
                    key={item.id || item.invoice}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    {/* INVOICE */}
                    <td className="py-4 text-xs font-bold text-primary">
                      {item.invoice || item.id}
                    </td>

                    {/* DATE */}
                    <td className="py-4 text-xs font-medium text-primary/60">
                      {item.date}
                    </td>

                    {/* AMOUNT */}
                    <td className="py-4 text-xs font-extrabold text-primary">
                      CHF {item.amount}
                    </td>

                    {/* METHOD */}
                    <td className="py-4 text-xs font-medium text-primary/70">
                      {item.method}
                    </td>

                    {/* STATUS */}
                    <td className="py-4 text-xs font-bold">
                      {item.status === "Paid" && (
                        <span className="text-emerald-600">Paid</span>
                      )}
                      {item.status === "Pending" && (
                        <span className="inline-flex rounded-md bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-600 border border-amber-100/70">
                          Pending
                        </span>
                      )}
                      {item.status === "Failed" && (
                        <span className="text-rose-500">Failed</span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-primary/40">
                        <button
                          type="button"
                          onClick={() => onViewInvoice?.(item)}
                          className="p-1 rounded-lg hover:text-primary hover:bg-gray-100 transition-colors"
                          title="View Invoice Details"
                          aria-label="View Invoice"
                        >
                          <FileText size={15} />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded-lg hover:text-btnPrimary hover:bg-sky-50 transition-colors"
                          title="Download Receipt"
                          aria-label="Download Receipt"
                        >
                          <Download size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onViewInvoice?.(item)}
                          className="p-1 rounded-lg hover:text-primary hover:bg-gray-100 transition-colors"
                          title="Preview Receipt"
                          aria-label="Preview"
                        >
                          <Eye size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* SHOW MORE Toggle */}
        {filteredHistory.length > 6 && (
          <div className="pt-2 text-center border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-primary/60 hover:text-primary transition-colors cursor-pointer py-1"
            >
              <span>{showAll ? "SHOW LESS" : "SHOW MORE"}</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
