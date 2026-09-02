import React, { useState } from "react";
import { Link } from "react-router";
import {
  FileText,
  Smartphone,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Plus,
  MoreVertical,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Sparkles,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { PaymentMethodIcon } from "../components/PaymentMethodIcon";

export const MakePaymentTab = ({
  paymentTypes,
  paymentType,
  setPaymentType,
  bills,
  selectedBill,
  setSelectedBill,
  topUpOptions,
  topUpAmount,
  setTopUpAmount,
  customTopUp,
  setCustomTopUp,
  paymentMethods,
  selectedMethodId,
  setSelectedMethodId,
  onOpenAddMethod,
  onPayNow,
  isProcessing,
  onDeleteMethod,
  onSetDefaultMethod,
}) => {
  const [isBillDropdownOpen, setIsBillDropdownOpen] = useState(false);
  const [activeMenuMethodId, setActiveMenuMethodId] = useState(null);

  const isBill = paymentType === "bill";
  const currentAmount = isBill ? (selectedBill?.amount || "34.90") : topUpAmount;

  return (
    <div className="space-y-6">
      {/* 1. What would you like to pay? */}
      <section className="space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-primary">
          What would you like to pay?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Option 1: My Bill */}
          <div
            onClick={() => setPaymentType("bill")}
            className={`flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all ${
              paymentType === "bill"
                ? "border-2 border-btnPrimary bg-white shadow-sm ring-4 ring-btnPrimary/5"
                : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {/* Custom Radio */}
            <div className="flex items-center justify-center shrink-0">
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentType === "bill"
                    ? "border-btnPrimary bg-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {paymentType === "bill" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-btnPrimary"></div>
                )}
              </div>
            </div>

            {/* Icon Box */}
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                paymentType === "bill"
                  ? "border-sky-200 bg-sky-50 text-btnPrimary"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            >
              <FileText size={20} />
            </span>

            {/* Text */}
            <div>
              <h4 className="text-sm font-bold text-primary">My bill</h4>
              <p className="text-xs text-primary/60 mt-0.5">
                Pay your monthly bill
              </p>
            </div>
          </div>

          {/* Option 2: Top up my line */}
          <div
            onClick={() => setPaymentType("topup")}
            className={`flex items-center gap-3.5 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all ${
              paymentType === "topup"
                ? "border-2 border-btnPrimary bg-white shadow-sm ring-4 ring-btnPrimary/5"
                : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            {/* Custom Radio */}
            <div className="flex items-center justify-center shrink-0">
              <div
                className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  paymentType === "topup"
                    ? "border-btnPrimary bg-white"
                    : "border-gray-300 bg-white"
                }`}
              >
                {paymentType === "topup" && (
                  <div className="h-2.5 w-2.5 rounded-full bg-btnPrimary"></div>
                )}
              </div>
            </div>

            {/* Icon Box */}
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                paymentType === "topup"
                  ? "border-sky-200 bg-sky-50 text-btnPrimary"
                  : "border-gray-200 bg-gray-50 text-gray-500"
              }`}
            >
              <Smartphone size={20} />
            </span>

            {/* Text */}
            <div>
              <h4 className="text-sm font-bold text-primary">Top up my line</h4>
              <p className="text-xs text-primary/60 mt-0.5">
                Add credit to my balance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Select the bill OR Select Top-Up Amount */}
      {isBill ? (
        <section className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-primary">
            2. Select the bill
          </h3>

          <div className="relative">
            {/* Selected Bill Card */}
            <div
              onClick={() => setIsBillDropdownOpen(!isBillDropdownOpen)}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border border-gray-200 bg-white hover:border-btnPrimary/50 cursor-pointer transition-all shadow-sm"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center shrink-0">
                  <div className="h-5 w-5 rounded-full border-2 border-btnPrimary bg-white flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-btnPrimary"></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-primary">
                    {selectedBill?.month || "July 2024"}
                  </h4>
                  <p className="text-xs text-primary/50 mt-0.5">
                    Issued on {selectedBill?.issueDate || "July 10, 2024"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                  {selectedBill?.statusText || "Paid on July 10, 2024"}
                </span>

                <span className="text-sm sm:text-base font-bold text-primary">
                  CHF {selectedBill?.amount || "34.90"}
                </span>

                <span className="text-primary/40">
                  {isBillDropdownOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </span>
              </div>
            </div>

            {/* Dropdown for other bills */}
            {isBillDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 z-20 rounded-2xl border border-gray-200 bg-white p-2 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                {bills.map((bill) => (
                  <div
                    key={bill.id}
                    onClick={() => {
                      setSelectedBill(bill);
                      setIsBillDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                      bill.id === selectedBill?.id
                        ? "bg-blue-50/70 text-btnPrimary"
                        : "hover:bg-gray-50 text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full border flex items-center justify-center">
                        {bill.id === selectedBill?.id && (
                          <div className="h-2 w-2 rounded-full bg-btnPrimary"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{bill.month}</p>
                        <p className="text-[11px] text-primary/50">
                          {bill.issueDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          bill.status === "Paid"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {bill.status}
                      </span>
                      <span className="text-xs font-bold">CHF {bill.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Link
              to="/dashboard/user/bills"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-btnPrimary hover:underline"
            >
              <span>View all my bills</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </section>
      ) : (
        <section className="space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-primary">
            2. Select top-up amount
          </h3>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {topUpOptions.map((opt) => {
                const isSelected = topUpAmount === opt.amount && !customTopUp;
                return (
                  <button
                    key={opt.amount}
                    type="button"
                    onClick={() => {
                      setTopUpAmount(opt.amount);
                      setCustomTopUp(false);
                    }}
                    className={`relative p-3.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "border-btnPrimary bg-sky-50/50 ring-2 ring-btnPrimary/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {opt.popular && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <p className="text-sm font-extrabold text-primary">
                      CHF {opt.amount}
                    </p>
                    {opt.bonus && (
                      <p className="text-[10px] font-medium text-emerald-600 mt-1">
                        {opt.bonus}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <span className="text-xs font-semibold text-primary/70">
                Or enter custom amount:
              </span>
              <div className="relative w-36">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary/50">
                  CHF
                </span>
                <input
                  type="number"
                  min="5"
                  max="500"
                  step="5"
                  placeholder="25.00"
                  onChange={(e) => {
                    if (e.target.value) {
                      setTopUpAmount(parseFloat(e.target.value).toFixed(2));
                      setCustomTopUp(true);
                    }
                  }}
                  className="w-full rounded-xl border border-gray-200 pl-11 pr-3 py-2 text-xs font-bold text-primary focus:border-btnPrimary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Choose your payment method */}
      <section className="space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-primary">
          Choose your payment method
        </h3>

        <div className="rounded-2xl border border-gray-200 bg-white divide-y divide-gray-100 overflow-hidden shadow-sm">
          {paymentMethods.map((method) => {
            const isSelected = selectedMethodId === method.id;

            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`flex items-center justify-between p-4 sm:p-5 cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50/20" : "hover:bg-gray-50/60"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Radio button */}
                  <div className="flex items-center justify-center shrink-0">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-btnPrimary bg-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <div className="h-2.5 w-2.5 rounded-full bg-btnPrimary"></div>
                      )}
                    </div>
                  </div>

                  {/* Logo + Title + Default Badge */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <PaymentMethodIcon brand={method.brand} />
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {method.title}
                    </span>
                    {method.isDefault && (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        Default
                      </span>
                    )}
                  </div>
                </div>

                {/* Right info (Expiry & 3-dots Menu) */}
                <div className="flex items-center gap-4 shrink-0">
                  {method.expiry && (
                    <span className="text-xs text-primary/45 font-medium hidden sm:inline">
                      Exp. {method.expiry}
                    </span>
                  )}

                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuMethodId(
                          activeMenuMethodId === method.id ? null : method.id
                        );
                      }}
                      className="p-1 rounded-lg text-primary/40 hover:text-primary hover:bg-gray-100 transition-colors"
                      aria-label="Payment method options"
                    >
                      <MoreVertical size={16} />
                    </button>

                    {activeMenuMethodId === method.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-gray-100 bg-white p-1 shadow-lg z-20 text-xs text-primary animate-in fade-in duration-150"
                      >
                        {!method.isDefault && (
                          <button
                            type="button"
                            onClick={() => {
                              onSetDefaultMethod(method.id);
                              setActiveMenuMethodId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-gray-50"
                          >
                            <Check size={14} className="text-btnPrimary" />
                            <span>Set as default</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteMethod(method.id);
                            setActiveMenuMethodId(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          <span>Remove method</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Row 5: Add a card or payment method */}
          <div
            onClick={onOpenAddMethod}
            className="flex items-center gap-3.5 p-4 sm:p-5 cursor-pointer hover:bg-sky-50/30 transition-colors group"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-gray-400 group-hover:border-btnPrimary group-hover:text-btnPrimary transition-colors">
              <Plus size={12} strokeWidth={2.5} />
            </div>

            <span className="text-xs sm:text-sm font-semibold text-primary/80 group-hover:text-btnPrimary transition-colors">
              Add a card or payment method
            </span>
          </div>
        </div>
      </section>

      {/* 4. Confirm the payment */}
      <section className="space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-primary">
          4. Confirm the payment
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-blue-100 bg-[#eef7ff] shadow-sm">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-btnPrimary shadow-sm">
              <ShieldCheck size={22} />
            </span>
            <div>
              <h4 className="text-sm font-bold text-primary">
                100% secure payment
              </h4>
              <p className="text-xs text-primary/60 mt-0.5">
                Your information is encrypted and protected.
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right self-end sm:self-center">
            <p className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight">
              CHF {currentAmount}
            </p>
            <p className="text-[11px] text-primary/45 font-medium">
              VAT included
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-2">
        <Link
          to="/dashboard/user"
          className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-primary/70 hover:bg-gray-50 hover:text-primary transition-colors shadow-sm"
        >
          Cancel
        </Link>

        <button
          type="button"
          disabled={isProcessing}
          onClick={onPayNow}
          className="inline-flex items-center gap-2 rounded-xl bg-btnPrimary px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-btnPrimary/90 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          <CreditCard size={16} />
          <span>
            {isProcessing ? "Processing..." : `Pay CHF ${currentAmount}`}
          </span>
        </button>
      </div>
    </div>
  );
};
