import { PAYMENT_METHODS } from "@/config/payment";

const BrandBadge = ({ name }) => {
  if (name === "Visa") {
    return (
      <span className="rounded bg-[#1a1f71] px-2 py-0.5 text-[10px] font-bold text-white">
        VISA
      </span>
    );
  }
  if (name === "Mastercard") {
    return (
      <span className="flex h-5 w-8 items-center justify-center rounded bg-[#eb001b] text-[8px] font-bold text-white">
        MC
      </span>
    );
  }
  if (name === "Maestro") {
    return (
      <span className="rounded bg-[#0066a1] px-1.5 py-0.5 text-[9px] font-bold text-white">
        Maestro
      </span>
    );
  }
  if (name === "TWINT") {
    return (
      <span className="rounded bg-black px-2 py-0.5 text-[10px] font-bold text-white">
        TWINT
      </span>
    );
  }
  if (name === "Apple Pay") {
    return (
      <span className="rounded bg-black px-2 py-0.5 text-[10px] font-medium text-white">
         Pay
      </span>
    );
  }
  if (name === "Google Pay") {
    return (
      <span className="rounded border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-primary">
        G Pay
      </span>
    );
  }
  return null;
};

const PaymentMethodSelector = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => {
        const selected = value === method.id;

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            aria-pressed={selected}
            className={`flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-4 text-left transition-colors sm:px-5 ${
              selected
                ? "border-btnPrimary bg-btnPrimary/10"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  selected
                    ? "border-btnPrimary bg-btnPrimary"
                    : "border-gray-300 bg-white"
                }`}
              >
                {selected && (
                  <span className="h-2 w-2 rounded-full bg-white" />
                )}
              </span>
              <span
                className={`text-sm font-semibold sm:text-base ${
                  selected ? "text-btnPrimary" : "text-primary"
                }`}
              >
                {method.label}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {method.brands.map((brand) => (
                <BrandBadge key={brand} name={brand} />
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default PaymentMethodSelector;
