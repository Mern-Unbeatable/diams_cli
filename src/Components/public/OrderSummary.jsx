import {
  CheckCircle2,
  Globe,
  Phone,
  Signal,
  Smartphone,
  Wifi,
} from "lucide-react";
import { ORDER_SUMMARY_ITEMS } from "@/config/configure";

const SUMMARY_ICONS = {
  signal: Signal,
  phone: Phone,
  globe: Globe,
  wifi: Wifi,
  sim: Smartphone,
  check: CheckCircle2,
};

const OrderSummary = ({ plan, simType = "esim" }) => {
  const items = ORDER_SUMMARY_ITEMS[plan.id] ?? ORDER_SUMMARY_ITEMS.plus;
  const esimValue = simType === "esim" ? "Yes" : "Physical SIM";

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-white/10 bg-secondary p-5 sm:p-6">
        <h2 className="text-lg font-bold text-white sm:text-xl">Order summary</h2>

        <div className="relative mt-4 rounded-xl bg-primary p-5 sm:p-6">
          {plan.popular && (
            <span className="absolute right-4 top-4 rounded-full bg-btnPrimary px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white sm:right-5 sm:top-5">
              POPULAR
            </span>
          )}

          <p className="pr-16 text-base font-bold text-white sm:pr-20">
            NovaSky <span className="text-textAccent">{plan.name}</span>
          </p>

          <div className="mt-3 flex items-end gap-1">
            <span className="pb-0.5 text-sm font-medium text-white">
              {plan.currency}
            </span>
            <span className="text-[32px] font-bold leading-none text-white sm:text-[34px]">
              {plan.price}
            </span>
            <span className="pb-0.5 text-sm text-white">{plan.period}</span>
          </div>

          <ul className="mt-6 space-y-3.5">
            {items.map(({ icon, label, value }) => {
              const Icon = SUMMARY_ICONS[icon];
              const displayValue =
                label === "eSIM availability" ? esimValue : value;

              return (
                <li key={label} className="flex items-center gap-2.5 text-sm">
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="shrink-0 text-textsecondary"
                  />
                  <span className="text-white">
                    {label} ({displayValue})
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Activation fee</span>
              <span className="text-white">CHF 0.00</span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-base font-bold text-white">Total</span>
              <span className="text-xl font-bold text-white">
                {plan.currency} {plan.price}
              </span>
            </div>

            <p className="mt-3 text-center text-xs italic text-white/45">
              Monthly (VAT included)
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default OrderSummary;
