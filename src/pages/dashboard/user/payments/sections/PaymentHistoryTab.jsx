import React, { useState } from "react";
import {
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronDown,
  Receipt,
  FileText,
} from "lucide-react";
import { PaymentMethodIcon } from "../components/PaymentMethodIcon";

export const PaymentHistoryTab = ({ paymentHistory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredHistory = paymentHistory.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.invoiceRef.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-6 shadow-sm">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40"
            />
            <input
              type="text"
              placeholder="Search by transaction ID, invoice or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-gray-200 pl-9 pr-3.5 py-2 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-primary focus:border-btnPrimary focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="successful">Successful</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-primary/45">
                <th className="pb-3 font-bold">TRANSACTION / DATE</th>
                <th className="pb-3 font-bold">DESCRIPTION</th>
                <th className="pb-3 font-bold">METHOD</th>
                <th className="pb-3 font-bold">AMOUNT</th>
                <th className="pb-3 font-bold">STATUS</th>
                <th className="pb-3 font-bold text-center">RECEIPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-xs text-primary/50">
                    No payment history matches your criteria.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/50">
                    {/* Transaction ID & Date */}
                    <td className="py-4 text-xs">
                      <p className="font-mono text-[11px] font-bold text-primary">
                        {item.id}
                      </p>
                      <p className="text-[11px] text-primary/45 mt-0.5">
                        {item.date}
                      </p>
                    </td>

                    {/* Description */}
                    <td className="py-4 text-xs">
                      <p className="font-bold text-primary">{item.description}</p>
                      <p className="text-[11px] text-primary/45 mt-0.5">
                        Ref: {item.invoiceRef}
                      </p>
                    </td>

                    {/* Method */}
                    <td className="py-4 text-xs">
                      <div className="flex items-center gap-2">
                        <PaymentMethodIcon brand={item.brand} />
                        <span className="font-semibold text-primary/80">
                          {item.method}
                        </span>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 text-xs">
                      <p className="text-sm font-bold text-primary">
                        CHF {item.amount}
                      </p>
                      <p className="text-[10px] text-primary/40">VAT included</p>
                    </td>

                    {/* Status */}
                    <td className="py-4 text-xs">
                      {item.status === "Successful" ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <CheckCircle2 size={14} />
                          Successful
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600">
                          <Clock size={14} />
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Receipt download */}
                    <td className="py-4 text-center">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-btnPrimary transition-colors hover:bg-sky-100"
                        title="Download Receipt"
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between text-xs text-primary/50">
          <p className="text-xs">
            Showing {filteredHistory.length} of {paymentHistory.length} transactions
          </p>

          <div className="flex items-center gap-1.5 justify-center">
            <button
              type="button"
              className="px-2 py-1 text-primary/40 hover:text-primary transition-colors disabled:opacity-30"
              disabled={currentPage === 1}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              className={`h-7 w-7 rounded-lg text-xs font-bold transition-colors ${
                currentPage === 1
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/70 hover:bg-gray-100"
              }`}
            >
              1
            </button>
            <button
              type="button"
              className="px-2 py-1 text-primary/40 hover:text-primary transition-colors"
              disabled
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
