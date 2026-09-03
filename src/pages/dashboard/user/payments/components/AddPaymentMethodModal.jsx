import React, { useState } from "react";
import { X, CreditCard, ShieldCheck, Lock, Check } from "lucide-react";
import { PaymentMethodIcon } from "./PaymentMethodIcon";

export const AddPaymentMethodModal = ({ isOpen, onClose, onAddMethod }) => {
  const [methodType, setMethodType] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [twintNumber, setTwintNumber] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCardNumberChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setExpiry(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      let newMethod;
      if (methodType === "card") {
        const last4 = cardNumber.replace(/\s/g, "").slice(-4) || "9999";
        const isMastercard = cardNumber.startsWith("5");
        newMethod = {
          id: `pm-card-${Date.now()}`,
          type: "card",
          brand: isMastercard ? "mastercard" : "visa",
          title: `${isMastercard ? "Mastercard" : "Visa"} **** ${last4}`,
          expiry: expiry || "12/28",
          isDefault: isDefault,
          holder: cardHolder || "Thomas Müller",
        };
      } else if (methodType === "twint") {
        newMethod = {
          id: `pm-twint-${Date.now()}`,
          type: "twint",
          brand: "twint",
          title: "TWINT",
          expiry: null,
          isDefault: isDefault,
          holder: twintNumber || "+41 79 123 45 67",
        };
      } else {
        newMethod = {
          id: `pm-apple-${Date.now()}`,
          type: "apple-pay",
          brand: "apple-pay",
          title: "Apple Pay",
          expiry: null,
          isDefault: isDefault,
          holder: "Apple Wallet",
        };
      }

      onAddMethod(newMethod);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-btnPrimary border border-sky-100">
              <CreditCard size={20} />
            </span>
            <div>
              <h3 className="text-base font-bold text-primary">
                Add Payment Method
              </h3>
              <p className="text-xs text-primary/60">
                Securely link a new card or digital wallet
              </p>
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

        {/* Payment Type Switcher */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100/80 rounded-xl">
          <button
            type="button"
            onClick={() => setMethodType("card")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              methodType === "card"
                ? "bg-white text-primary shadow-sm"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setMethodType("twint")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              methodType === "twint"
                ? "bg-white text-primary shadow-sm"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            TWINT
          </button>
          <button
            type="button"
            onClick={() => setMethodType("apple-pay")}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
              methodType === "apple-pay"
                ? "bg-white text-primary shadow-sm"
                : "text-primary/60 hover:text-primary"
            }`}
          >
            Apple Pay
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {methodType === "card" && (
            <>
              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="e.g. Thomas Müller"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none pr-16"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
                    <PaymentMethodIcon brand="visa" />
                    <PaymentMethodIcon brand="mastercard" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {methodType === "twint" && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-primary mb-1">
                  Swiss Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={twintNumber}
                  onChange={(e) => setTwintNumber(e.target.value)}
                  placeholder="+41 79 000 00 00"
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs text-primary placeholder-primary/30 focus:border-btnPrimary focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-primary/60">
                You will receive a notification in your TWINT app to
                authenticate this connection.
              </p>
            </div>
          )}

          {methodType === "apple-pay" && (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 text-center space-y-2">
              <PaymentMethodIcon brand="apple" />
              <p className="text-xs font-semibold text-primary">
                Apple Pay is ready to be linked with your device credentials.
              </p>
              <p className="text-[11px] text-primary/50">
                No need to enter manual card numbers. Quick and biometric
                authenticated.
              </p>
            </div>
          )}

          {/* Set as Default checkbox */}
          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-btnPrimary focus:ring-btnPrimary"
            />
            <span className="text-xs text-primary/80 font-medium select-none">
              Set as default payment method for future bills
            </span>
          </label>

          {/* Security notice */}
          <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2.5 text-[11px] text-primary/60">
            <Lock size={14} className="text-emerald-600 shrink-0" />
            <span>256-bit encrypted with PCI-DSS Level 1 bank security</span>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-primary/70 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-btnPrimary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-btnPrimary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Payment Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
