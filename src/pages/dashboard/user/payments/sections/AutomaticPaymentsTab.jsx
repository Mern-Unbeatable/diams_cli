import React, { useState } from "react";
import {
  Calendar,
  RotateCw,
  CreditCard,
  Plus,
  Check,
  CheckCircle2,
  ChevronDown,
  Smartphone,
} from "lucide-react";

export const AutomaticPaymentsTab = ({
  automaticPayments,
  paymentMethods,
  onOpenAddMethod,
}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [billingDay, setBillingDay] = useState("1st");
  const [isCycleDropdownOpen, setIsCycleDropdownOpen] = useState(false);
  const [selectedMethodId, setSelectedMethodId] =
    useState("pm-mastercard-9043");

  const billingCycles = [
    {
      value: "1st",
      label: "Monthly — on the 1st",
      cycleText: "Monthly • 1st",
      nextDate: "1 August 2026",
    },
    {
      value: "5th",
      label: "Monthly — on the 5th",
      cycleText: "Monthly • 5th",
      nextDate: "5 August 2026",
    },
    {
      value: "10th",
      label: "Monthly — on the 10th",
      cycleText: "Monthly • 10th",
      nextDate: "10 August 2026",
    },
    {
      value: "15th",
      label: "Monthly — on the 15th",
      cycleText: "Monthly • 15th",
      nextDate: "15 August 2026",
    },
    {
      value: "25th",
      label: "Monthly — on the 25th",
      cycleText: "Monthly • 25th",
      nextDate: "25 August 2026",
    },
  ];

  const currentCycle =
    billingCycles.find((c) => c.value === billingDay) || billingCycles[0];

  const autoPaymentCards = [
    {
      id: "pm-visa-4821",
      brand: "visa",
      title: "Visa",
      details: "•••• 4821 • Exp 06/28",
      type: "card",
    },
    {
      id: "pm-mastercard-9043",
      brand: "mastercard",
      title: "Mastercard",
      details: "•••• 9043 • Exp 02/27",
      type: "card",
    },
    {
      id: "pm-twint-4218",
      brand: "twint",
      title: "TWINT",
      details: "+41 79 ••• 42 18",
      type: "twint",
    },
    {
      id: "pm-apple-pay",
      brand: "apple-pay",
      title: "Apple Pay",
      details: "Touch ID or Face ID",
      type: "apple-pay",
    },
  ];

  const activeMethod =
    autoPaymentCards.find((m) => m.id === selectedMethodId) ||
    autoPaymentCards[1];

  return (
    <div className="space-y-6">
      {/* 1. Billing cycle Card */}
      <section className="rounded-xl border border-gray-100/90 bg-white p-6 shadow-sm space-y-4">
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
            <Calendar size={20} />
          </span>
          <div>
            <h3 className="text-base font-bold text-primary">Billing cycle</h3>
            <p className="text-xs text-primary/60 mt-0.5">
              Pick the day your invoice is charged.
            </p>
          </div>
        </div>

        {/* Dropdown Selector */}
        <div className="relative pt-1">
          <button
            type="button"
            onClick={() => setIsCycleDropdownOpen(!isCycleDropdownOpen)}
            className="flex items-center justify-between w-full sm:w-72 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs font-semibold text-primary hover:border-btnPrimary/60 transition-colors shadow-sm cursor-pointer"
          >
            <span>{currentCycle.label}</span>
            <ChevronDown
              size={16}
              className={`text-primary/40 transition-transform ${
                isCycleDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isCycleDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-72 z-20 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl space-y-1 animate-in fade-in duration-150">
              {billingCycles.map((cycle) => (
                <button
                  key={cycle.value}
                  type="button"
                  onClick={() => {
                    setBillingDay(cycle.value);
                    setIsCycleDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors text-left ${
                    cycle.value === billingDay
                      ? "bg-sky-50 text-btnPrimary font-bold"
                      : "text-primary hover:bg-gray-50"
                  }`}
                >
                  <span>{cycle.label}</span>
                  {cycle.value === billingDay && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. AutoPay status Card */}
      <section className="rounded-xl border border-gray-100/90 bg-white p-6 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <RotateCw size={19} />
            </span>
            <h3 className="text-base font-bold text-primary">AutoPay status</h3>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isEnabled
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isEnabled ? "bg-emerald-500" : "bg-gray-400"
              }`}
            ></span>
            {isEnabled ? "Active" : "Inactive"}
          </span>
        </div>

        <p className="text-xs text-primary/60">
          Your invoice is settled automatically each cycle.
        </p>

        {/* Blue Amount Banner */}
        <div className="rounded-xl bg-linear-to-r from-[#1765dc] to-[#1e78f0] p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md shadow-blue-500/10">
          <div>
            <p className="text-xs text-white/80 font-medium">Monthly amount</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5 tracking-tight">
              CHF 84.90
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="text-xs sm:text-sm font-semibold text-white">
              Enable AutoPay
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isEnabled}
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none ${
                isEnabled ? "bg-[#0b1c3d]" : "bg-white/30"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 3 Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="rounded-xl bg-gray-50/80 p-4 border border-gray-100 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              BILLING CYCLE
            </p>
            <p className="text-xs sm:text-sm font-bold text-primary">
              {currentCycle.cycleText}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50/80 p-4 border border-gray-100 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              NEXT PAYMENT
            </p>
            <p className="text-xs sm:text-sm font-bold text-primary">
              {currentCycle.nextDate}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50/80 p-4 border border-gray-100 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              DEFAULT METHOD
            </p>
            <p className="text-xs sm:text-sm font-bold text-primary truncate">
              {activeMethod.title}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Change payment method Card */}
      <section className="rounded-xl border border-gray-100/90 bg-white p-6 shadow-sm space-y-5">
        {/* Header */}
        <div className="flex items-start gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
            <CreditCard size={20} />
          </span>
          <div>
            <h3 className="text-base font-bold text-primary">
              Change payment method
            </h3>
            <p className="text-xs text-primary/60 mt-0.5">
              Used for every recurring charge.
            </p>
          </div>
        </div>

        {/* 2x2 Payment Method Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {autoPaymentCards.map((method) => {
            const isSelected = selectedMethodId === method.id;

            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethodId(method.id)}
                className={`p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                  isSelected
                    ? "border-2 border-btnPrimary bg-white shadow-sm ring-4 ring-btnPrimary/5"
                    : "border border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Left Brand Badge */}
                  {method.brand === "visa" && (
                    <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
                      <CreditCard size={18} className="text-primary/70" />
                    </div>
                  )}

                  {method.brand === "mastercard" && (
                    <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-200 relative">
                      <span className="w-3.5 h-3.5 rounded-full bg-red-500 opacity-90 inline-block"></span>
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500 opacity-90 -ml-1.5 inline-block"></span>
                    </div>
                  )}

                  {method.brand === "twint" && (
                    <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
                      <Smartphone size={17} className="text-primary/70" />
                    </div>
                  )}

                  {method.brand === "apple-pay" && (
                    <div className="flex h-9 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 border border-gray-200">
                      <svg
                        className="w-4 h-4 fill-primary"
                        viewBox="0 0 170 170"
                      >
                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.98-14.36-5.83-8.87-10.42-18.99-13.78-30.36-3.36-11.37-5.04-22.37-5.04-33 0-14.88 3.73-27.42 11.19-37.62 7.46-10.2 16.99-15.42 28.58-15.66 4.96 0 10.36 1.34 16.19 4.02 5.83 2.68 9.54 4.09 11.13 4.23 1.29-.26 5.25-1.74 11.88-4.44 6.63-2.7 12.18-3.9 16.65-3.6 12.37.98 22.09 5.66 29.17 14.04-10.99 6.63-16.32 15.65-15.99 27.06.33 9.46 4.14 17.37 11.43 23.73 7.29 6.36 15.86 9.88 25.71 10.57-2.34 7.07-5.18 14.16-8.52 21.28zM119.22 31.84c0-7.39 2.63-14.37 7.9-20.94 5.27-6.57 11.75-10.53 19.44-11.9 1.09 7.82-1.39 15.22-7.44 22.21-6.05 6.99-12.68 10.53-19.9 10.63z" />
                      </svg>
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-primary">
                      {method.title}
                    </p>
                    <p className="text-[11px] text-primary/50 truncate mt-0.5">
                      {method.details}
                    </p>
                  </div>
                </div>

                {/* Right Selection Indicator */}
                <div className="flex items-center justify-center shrink-0 ml-2">
                  {isSelected ? (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new card Dashed Row */}
        <div
          onClick={onOpenAddMethod}
          className="flex items-center gap-3.5 p-4 rounded-xl border-2 border-dashed border-gray-200 bg-white hover:border-btnPrimary/60 hover:bg-sky-50/20 cursor-pointer transition-all group"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-btnPrimary border border-sky-100 group-hover:bg-btnPrimary group-hover:text-white transition-colors">
            <Plus size={16} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs font-bold text-primary group-hover:text-btnPrimary transition-colors">
              Add new card
            </p>
            <p className="text-[11px] text-primary/50 mt-0.5">
              Visa, Mastercard or American Express
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
