import {
  CheckCircle2,
  Globe,
  MessageSquare,
  Phone,
  Signal,
  Wifi,
} from "lucide-react";
import {
  CHECKOUT_DEFAULTS,
  CHECKOUT_SIDEBAR_FEATURES,
} from "@/config/personalInfo";

const FEATURE_ICONS = {
  signal: Signal,
  phone: Phone,
  message: MessageSquare,
  wifi: Wifi,
  check: CheckCircle2,
  globe: Globe,
};

const CheckoutSidebar = ({ plan }) => {
  const features =
    CHECKOUT_SIDEBAR_FEATURES[plan.id] ?? CHECKOUT_SIDEBAR_FEATURES.plus;

  return (
    <aside>
      <div className="overflow-hidden rounded-xl bg-primary">
        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Order summary
          </h2>

          <div className="mt-4 flex items-start justify-between gap-3">
            <p className="text-base font-bold text-white">
              NovaSky <span className="text-textAccent">{plan.name}</span>
            </p>
            {plan.popular && (
              <span className="shrink-0 rounded-full bg-btnPrimary px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                POPULAR
              </span>
            )}
          </div>

          <div className="mt-3 flex items-end gap-1">
            <span className="pb-0.5 text-sm font-medium text-white">
              {plan.currency}
            </span>
            <span className="text-[32px] font-bold leading-none text-white sm:text-[34px]">
              {plan.price}
            </span>
            <span className="pb-0.5 text-sm text-white">{plan.period}</span>
          </div>

          <ul className="mt-6 space-y-3 border-b border-white/10 pb-6">
            {features.map(({ icon, text }) => {
              const Icon = FEATURE_ICONS[icon];

              return (
                <li key={text} className="flex items-center gap-2.5 text-sm">
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="shrink-0 text-textsecondary"
                  />
                  <span className="text-white/90">{text}</span>
                </li>
              );
            })}
          </ul>

          <dl className="mt-5 space-y-2.5 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Line type</dt>
              <dd className="font-medium text-white">
                {CHECKOUT_DEFAULTS.lineType}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Phone number</dt>
              <dd className="font-medium text-white">
                {CHECKOUT_DEFAULTS.phoneNumber}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Activation date</dt>
              <dd className="font-medium text-white">
                {CHECKOUT_DEFAULTS.activationDate}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">Activation fee</dt>
              <dd className="font-medium text-white">
                {CHECKOUT_DEFAULTS.activationFee}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-white/60">First payment</dt>
              <dd className="font-medium text-white">
                {plan.currency} {CHECKOUT_DEFAULTS.firstPayment}
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex items-center justify-between bg-btnPrimary px-5 py-4 sm:px-6">
          <span className="text-sm font-semibold text-white">Total today</span>
          <div className="text-right">
            <p className="text-xl font-bold text-white">
              {plan.currency} {CHECKOUT_DEFAULTS.firstPayment}
            </p>
            <p className="text-[11px] text-white/80">VAT included</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CheckoutSidebar;
