import { Link } from "react-router";
import {
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronLeft,
  Cpu,
  Shield,
  Smartphone,
  Wifi,
} from "lucide-react";
import {
  CONFIRMATION_PAGE,
  NEXT_STEPS,
  ORDER_DETAILS,
} from "@/config/confirmation";
import appPromoImage from "@/assets/plans/app-promo.png";

const STEP_ICONS = {
  chip: Cpu,
  shield: Shield,
  wifi: Wifi,
  phone: Smartphone,
};

const ConfirmationContentSection = ({ planId }) => {
  return (
    <div className="min-w-0">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2
            size={28}
            strokeWidth={1.75}
            className="text-emerald-600"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {CONFIRMATION_PAGE.title}{" "}
            <span className="text-emerald-600">
              {CONFIRMATION_PAGE.titleAccent}
            </span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-primary/70 sm:text-base">
            {CONFIRMATION_PAGE.subtitle}
          </p>
        </div>
      </div>

      <article className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <Bookmark
              size={20}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-btnPrimary"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary/50">
                Order number
              </p>
              <p className="mt-1 text-base font-bold text-primary sm:text-lg">
                {ORDER_DETAILS.orderNumber}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary/50">
                Order date and time
              </p>
              <p className="mt-1 text-sm text-primary/70">
                {ORDER_DETAILS.orderDate}
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Check size={14} strokeWidth={2.5} />
              Payment successful
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary/50">
              Total amount
            </p>
            <p className="mt-1 text-2xl font-bold text-primary">
              {ORDER_DETAILS.currency} {ORDER_DETAILS.total}
            </p>
            <p className="mt-0.5 text-xs text-primary/50">VAT included</p>
          </div>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="text-xl font-bold text-primary sm:text-2xl">
          Next steps
        </h2>
        <p className="mt-1 text-sm text-primary/60">
          Follow these simple steps to start using your service.
        </p>

        <ul className="mt-6 space-y-4">
          {NEXT_STEPS.map(({ id, icon, title, description }) => {
            const Icon = STEP_ICONS[icon];

            return (
              <li
                key={id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-btnPrimary/10">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="text-btnPrimary"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-primary">{title}</p>
                  <p className="mt-0.5 text-sm text-primary/60">
                    {description}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Check size={14} strokeWidth={2.5} />
                  Done
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-10 overflow-hidden rounded-xl">
        <img
          src={appPromoImage}
          alt="NovaSky mobile app"
          className="block h-auto w-full"
        />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={`/plans/${planId}/payment`}
          className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          <ChevronLeft size={16} />
          Back
        </Link>

        <Link
          to={`/plans/${planId}/activation`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:min-w-50"
        >
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationContentSection;
