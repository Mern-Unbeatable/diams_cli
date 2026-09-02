import React from "react";
import { Link } from "react-router";
import {
  FileText,
  ShieldCheck,
  Check,
  MessageCircle,
  HelpCircle,
  Phone,
  ChevronRight,
  Receipt,
  FileCheck,
} from "lucide-react";
import { USER_PAYMENTS } from "@/config/userPayments";

export const PaymentsSidebar = ({ selectedBill, onViewInvoice, paymentType, topUpAmount }) => {
  const { securityGuarantees, helpLinks } = USER_PAYMENTS;

  const isBill = paymentType === "bill";
  const amountToDisplay = isBill ? (selectedBill?.amount || "34.90") : topUpAmount;
  const invoiceLabel = isBill ? (selectedBill?.month || "July 2024") : "Prepaid Top-Up";
  const dueDateLabel = isBill ? (selectedBill?.dueDate || "July 10, 2024") : "Instant Credit";

  return (
    <div className="space-y-6">
      {/* Widget 1: Payment summary (Dark Navy Card) */}
      <section className="rounded-2xl bg-[#0b1329] p-5 sm:p-6 text-white space-y-5 shadow-lg shadow-slate-900/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">
            <FileCheck size={18} />
          </span>
          <h3 className="text-base font-bold">Payment summary</h3>
        </div>

        <div className="space-y-4 pt-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                INVOICE
              </p>
              <p className="text-xs font-semibold text-white mt-1">
                {invoiceLabel}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                DUE DATE
              </p>
              <p className="text-xs font-semibold text-white mt-1">
                {dueDateLabel}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
              AMOUNT
            </p>
            <p className="text-xs font-semibold text-white mt-1">
              CHF {amountToDisplay}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-white/70">
              Amount to pay
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-sm font-bold text-white/90">CHF</span>
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {amountToDisplay}
              </span>
            </div>
            <p className="text-[10px] text-white/40 mt-0.5">
              VAT included
            </p>
          </div>

          {isBill && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onViewInvoice}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                View invoice details &gt;
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Widget 2: Guaranteed security (White Card with Green Accents) */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldCheck size={18} />
          </span>
          <h3 className="text-sm font-bold text-primary">Guaranteed security</h3>
        </div>

        <ul className="space-y-2.5 pt-1">
          {securityGuarantees.map((item, index) => (
            <li key={index} className="flex items-center gap-2.5 text-xs text-primary/75 font-medium">
              <Check size={15} className="text-emerald-500 shrink-0 stroke-[2.5]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Widget 3: Need help? */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-3 shadow-sm">
        <h3 className="text-sm font-bold text-primary">Need help?</h3>
        <ul className="divide-y divide-gray-100">
          {helpLinks.map((item) => (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80 group"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-primary/70 border border-gray-100 group-hover:border-btnPrimary/30 group-hover:text-btnPrimary transition-colors">
                  {item.icon === "chat" && <MessageCircle size={16} />}
                  {item.icon === "help" && <HelpCircle size={16} />}
                  {item.icon === "phone" && <Phone size={16} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">{item.title}</p>
                  <p className="text-[10px] text-primary/45 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-primary/30 group-hover:text-btnPrimary transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
