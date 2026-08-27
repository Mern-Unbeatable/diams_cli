import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronLeft,
  CreditCard,
  Info,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { PAYMENT_PAGE, SAVE_CARD_OPTIONS } from "@/config/payment";
import PaymentMethodSelector from "@/Components/public/PaymentMethodSelector";
import PciSecurityBanner from "@/Components/public/PciSecurityBanner";

const labelClass = "mb-1.5 block text-sm font-bold text-primary";
const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";

const PaymentFormSection = ({ planId }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [saveCard, setSaveCard] = useState("save");

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-btnPrimary/10">
          <Lock size={22} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {PAYMENT_PAGE.title}{" "}
            <span className="text-btnPrimary">{PAYMENT_PAGE.titleAccent}</span>
          </h1>
          <p className="mt-2 text-sm text-primary/70 sm:text-base">
            {PAYMENT_PAGE.subtitle}
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-primary">
          1. Choose your payment method
        </h2>
        <div className="mt-5">
          <PaymentMethodSelector
            value={paymentMethod}
            onChange={setPaymentMethod}
          />
        </div>
      </section>

      {paymentMethod === "card" && (
        <>
          <section className="mt-10">
            <h2 className="text-lg font-bold text-primary">2. Card information</h2>
            <p className="mt-1 text-sm text-primary/60">All fields are required</p>

            <div className="mt-5">
              <label htmlFor="cardNumber" className={labelClass}>
                Card number
              </label>
              <div className="relative">
                <input
                  id="cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className={`${inputClass} pr-11`}
                />
                <CreditCard
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="expiry" className={labelClass}>
                  Expiry date
                </label>
                <input
                  id="expiry"
                  type="text"
                  placeholder="MM / YY"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="cvv" className={labelClass}>
                  CVV / Security code
                </label>
                <div className="relative">
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    className={`${inputClass} pr-10`}
                  />
                  <Info
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="cardholder" className={labelClass}>
                Cardholder name
              </label>
              <input
                id="cardholder"
                type="text"
                placeholder="John Doe"
                className={inputClass}
              />
            </div>

            <PciSecurityBanner />
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-bold text-primary">
              3. Save my payment details
            </h2>
            <div className="mt-5 space-y-3">
              {SAVE_CARD_OPTIONS.map((option) => {
                const selected = saveCard === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSaveCard(option.id)}
                    aria-pressed={selected}
                    className={`flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
                      selected
                        ? "border-btnPrimary bg-btnPrimary/5"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                        selected
                          ? "border-btnPrimary bg-btnPrimary"
                          : "border-gray-300"
                      }`}
                    >
                      {selected && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-primary">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="mt-0.5 block text-sm text-primary/60">
                          {option.description}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={`/plans/${planId}/verification`}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <Link
            to={`/plans/${planId}/confirmation`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-w-60"
          >
            <Lock size={18} />
            Pay Securely
          </Link>
          <p className="flex items-center gap-1.5 text-xs text-primary/50">
            <ShieldCheck size={14} className="text-emerald-600" />
            Secure payment by Stripe
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFormSection;
