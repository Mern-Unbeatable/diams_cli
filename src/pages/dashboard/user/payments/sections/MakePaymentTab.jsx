import { useState } from "react";
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
  Trash2,
} from "lucide-react";
import { PaymentMethodIcon } from "../components/PaymentMethodIcon";

const RadioDot = ({ selected }) => (
  <div
    className={[
      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors",
      selected ? "border-btnPrimary" : "border-gray-300",
    ].join(" ")}
  >
    {selected ? <div className="h-2.5 w-2.5 rounded-full bg-btnPrimary" /> : null}
  </div>
);

export const MakePaymentTab = ({
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
  const currentAmount = isBill ? selectedBill?.amount || "34.90" : topUpAmount;

  return (
    <div className="min-w-0 space-y-4 sm:space-y-5">
      <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 lg:p-7">
        {/* 1. What would you like to pay? */}
        <section className="min-w-0">
          <h3 className="text-sm font-bold text-primary sm:text-[15px]">
            1. What would you like to pay?
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 sm:mt-4 sm:gap-4">
            <button
              type="button"
              onClick={() => setPaymentType("bill")}
              className={[
                "flex w-full min-w-0 items-center gap-3 rounded-xl border p-3.5 text-left transition-all sm:gap-3.5 sm:p-4",
                paymentType === "bill"
                  ? "border-btnPrimary bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300",
              ].join(" ")}
            >
              <RadioDot selected={paymentType === "bill"} />
              <span
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11",
                  paymentType === "bill"
                    ? "border-sky-200 bg-sky-50 text-btnPrimary"
                    : "border-gray-200 bg-gray-50 text-gray-500",
                ].join(" ")}
              >
                <FileText size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-primary">My bill</span>
                <span className="mt-0.5 block text-xs text-primary/55">
                  Pay your monthly bill
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentType("topup")}
              className={[
                "flex w-full min-w-0 items-center gap-3 rounded-xl border p-3.5 text-left transition-all sm:gap-3.5 sm:p-4",
                paymentType === "topup"
                  ? "border-btnPrimary bg-white shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300",
              ].join(" ")}
            >
              <RadioDot selected={paymentType === "topup"} />
              <span
                className={[
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border sm:h-11 sm:w-11",
                  paymentType === "topup"
                    ? "border-sky-200 bg-sky-50 text-btnPrimary"
                    : "border-gray-200 bg-gray-50 text-gray-500",
                ].join(" ")}
              >
                <Smartphone size={18} />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-primary">
                  Top up my line
                </span>
                <span className="mt-0.5 block text-xs text-primary/55">
                  Add credit to my balance
                </span>
              </span>
            </button>
          </div>
        </section>

        {/* 2. Select the bill / top-up */}
        <section className="mt-6 min-w-0 sm:mt-8">
          {isBill ? (
            <>
              <h3 className="text-sm font-bold text-primary sm:text-[15px]">
                2. Select the bill
              </h3>

              <div className="relative mt-3 sm:mt-4">
                <button
                  type="button"
                  onClick={() => setIsBillDropdownOpen((open) => !open)}
                  className="flex w-full min-w-0 flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3.5 text-left transition-colors hover:border-btnPrimary/40 sm:p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <span className="flex min-w-0 items-center gap-3 sm:gap-3.5">
                    <RadioDot selected />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-primary">
                        {selectedBill?.month || "July 2024"}
                      </span>
                      <span className="mt-0.5 block text-xs text-primary/50">
                        Issued on {selectedBill?.issueDate || "July 10, 2024"}
                      </span>
                    </span>
                  </span>

                  <span className="flex flex-wrap items-center gap-2 sm:gap-3 lg:justify-end">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 sm:px-3 sm:text-xs">
                      {selectedBill?.statusText || "Paid on July 10, 2024"}
                    </span>
                    <span className="text-sm font-bold text-primary sm:text-base">
                      CHF {selectedBill?.amount || "34.90"}
                    </span>
                    <span className="text-primary/40">
                      {isBillDropdownOpen ? (
                        <ChevronUp size={18} />
                      ) : (
                        <ChevronDown size={18} />
                      )}
                    </span>
                  </span>
                </button>

                {isBillDropdownOpen ? (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 max-h-64 space-y-1 overflow-y-auto rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    {bills.map((bill) => (
                      <button
                        key={bill.id}
                        type="button"
                        onClick={() => {
                          setSelectedBill(bill);
                          setIsBillDropdownOpen(false);
                        }}
                        className={[
                          "flex w-full min-w-0 flex-col gap-2 rounded-xl p-3 text-left transition-colors sm:flex-row sm:items-center sm:justify-between",
                          bill.id === selectedBill?.id
                            ? "bg-blue-50/70 text-btnPrimary"
                            : "text-primary hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          <RadioDot selected={bill.id === selectedBill?.id} />
                          <span className="min-w-0">
                            <span className="block text-xs font-bold">{bill.month}</span>
                            <span className="block text-[11px] text-primary/50">
                              {bill.issueDate}
                            </span>
                          </span>
                        </span>
                        <span className="flex items-center gap-2 pl-8 sm:gap-3 sm:pl-0">
                          <span
                            className={[
                              "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                              bill.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700",
                            ].join(" ")}
                          >
                            {bill.status}
                          </span>
                          <span className="text-xs font-bold">CHF {bill.amount}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <Link
                to="/dashboard/user/bills"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-btnPrimary hover:opacity-80"
              >
                View all my bills
                <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <h3 className="text-sm font-bold text-primary sm:text-[15px]">
                2. Select top-up amount
              </h3>

              <div className="mt-3 space-y-4 rounded-xl border border-gray-200 bg-white p-4 sm:mt-4 sm:p-5">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-5">
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
                        className={[
                          "relative rounded-xl border p-3 text-center transition-all sm:p-3.5",
                          isSelected
                            ? "border-btnPrimary bg-sky-50/50 ring-2 ring-btnPrimary/20"
                            : "border-gray-200 bg-white hover:border-gray-300",
                        ].join(" ")}
                      >
                        {opt.popular ? (
                          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            Popular
                          </span>
                        ) : null}
                        <p className="text-sm font-extrabold text-primary">
                          CHF {opt.amount}
                        </p>
                        {opt.bonus ? (
                          <p className="mt-1 text-[10px] font-medium text-emerald-600">
                            {opt.bonus}
                          </p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-2 border-t border-gray-100 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                  <span className="text-xs font-semibold text-primary/70">
                    Or enter custom amount:
                  </span>
                  <div className="relative w-full max-w-44">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary/50">
                      CHF
                    </span>
                    <input
                      type="number"
                      min="5"
                      max="500"
                      step="5"
                      placeholder="25.00"
                      onChange={(event) => {
                        if (event.target.value) {
                          setTopUpAmount(parseFloat(event.target.value).toFixed(2));
                          setCustomTopUp(true);
                        }
                      }}
                      className="w-full rounded-xl border border-gray-200 py-2 pl-11 pr-3 text-xs font-bold text-primary outline-none focus:border-btnPrimary"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* 3. Choose your payment method */}
        <section className="mt-6 min-w-0 sm:mt-8">
          <h3 className="text-sm font-bold text-primary sm:text-[15px]">
            3. Choose your payment method
          </h3>

          <div className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white sm:mt-4">
            {paymentMethods.map((method) => {
              const isSelected = selectedMethodId === method.id;

              return (
                <div
                  key={method.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedMethodId(method.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedMethodId(method.id);
                    }
                  }}
                  className={[
                    "flex min-w-0 cursor-pointer items-start justify-between gap-2 p-3.5 transition-colors sm:items-center sm:gap-3 sm:p-5",
                    isSelected ? "bg-blue-50/30" : "hover:bg-gray-50/60",
                  ].join(" ")}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-3.5">
                    <RadioDot selected={isSelected} />
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-2.5">
                      <PaymentMethodIcon brand={method.brand} />
                      <span className="truncate text-sm font-semibold text-primary">
                        {method.title}
                      </span>
                      {method.isDefault ? (
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Default
                        </span>
                      ) : null}
                      {method.expiry ? (
                        <span className="w-full text-xs font-medium text-primary/45 sm:hidden">
                          Exp. {method.expiry}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                    {method.expiry ? (
                      <span className="hidden text-xs font-medium text-primary/45 sm:inline">
                        Exp. {method.expiry}
                      </span>
                    ) : null}

                    <div className="relative">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveMenuMethodId(
                            activeMenuMethodId === method.id ? null : method.id,
                          );
                        }}
                        className="rounded-lg p-1 text-primary/40 transition-colors hover:bg-gray-100 hover:text-primary"
                        aria-label="Payment method options"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeMenuMethodId === method.id ? (
                        <div
                          onClick={(event) => event.stopPropagation()}
                          className="absolute right-0 top-full z-20 mt-1 w-40 rounded-xl border border-gray-100 bg-white p-1 text-xs text-primary shadow-lg"
                        >
                          {!method.isDefault ? (
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
                          ) : null}
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
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={onOpenAddMethod}
              className="group flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-sky-50/30 sm:gap-3.5 sm:p-5"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-400 transition-colors group-hover:border-btnPrimary group-hover:text-btnPrimary">
                <Plus size={12} strokeWidth={2.5} />
              </span>
              <span className="text-sm font-semibold text-primary/80 transition-colors group-hover:text-btnPrimary">
                Add a card or payment method
              </span>
            </button>
          </div>
        </section>

        {/* 4. Confirm the payment */}
        <section className="mt-6 min-w-0 sm:mt-8">
          <h3 className="text-sm font-bold text-primary sm:text-[15px]">
            4. Confirm the payment
          </h3>

          <div className="mt-3 flex flex-col justify-between gap-4 rounded-xl border border-blue-100 bg-[#eef7ff] p-4 sm:mt-4 sm:flex-row sm:items-center sm:p-5">
            <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-white text-btnPrimary shadow-sm sm:h-11 sm:w-11">
                <ShieldCheck size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-primary">100% secure payment</p>
                <p className="mt-0.5 text-xs text-primary/60">
                  Your information is encrypted and protected.
                </p>
              </div>
            </div>

            <div className="self-start text-left sm:self-center sm:text-right">
              <p className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
                CHF {currentAmount}
              </p>
              <p className="text-[11px] font-medium text-primary/45">VAT included</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/dashboard/user"
          className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-primary/70 shadow-sm transition-colors hover:bg-gray-50 hover:text-primary sm:w-auto"
        >
          Cancel
        </Link>

        <button
          type="button"
          disabled={isProcessing}
          onClick={onPayNow}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-btnPrimary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-50 sm:w-auto sm:px-8"
        >
          <CreditCard size={16} />
          <span>{isProcessing ? "Processing..." : `Pay CHF ${currentAmount}`}</span>
        </button>
      </div>
    </div>
  );
};
