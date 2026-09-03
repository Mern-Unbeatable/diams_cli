import { Link } from "react-router";
import { Globe, Headset, ShieldCheck, Signal, Wifi } from "lucide-react";
import { PLANS_PAGE_HERO } from "@/config/plansPage";
import { PLAN_PRICING_IMAGE } from "@/config/planDetails";

const HIGHLIGHT_ICONS = {
  signal: Signal,
  shield: ShieldCheck,
  globe: Globe,
  headset: Headset,
  wifi: Wifi,
};

const PlanPriceCard = ({ plan, className = "" }) => {
  return (
    <div
      className={`rounded-xl border border-btnPrimary/25 bg-secondary p-6 sm:p-7 ${className}`}
    >
      <p className="text-sm text-white">Monthly Price</p>

      <div className="mt-3 flex items-end gap-1">
        <span className="pb-1 text-sm font-medium text-white">
          {plan.currency}
        </span>
        <span className="text-4xl font-bold leading-none text-white sm:text-[42px]">
          {plan.price}
        </span>
        <span className="pb-1 text-sm text-white">{plan.period}</span>
      </div>

      <div className="mt-7 flex flex-col gap-3">
        <Link
          to={`/plans/${plan.id}/configure`}
          className="flex w-full items-center justify-center rounded-lg bg-btnPrimary px-5 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          {plan.chooseLabel}
        </Link>

        <Link
          to={plan.coveragePath}
          className="flex w-full items-center justify-center rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
        >
          Check Coverage
        </Link>
      </div>
    </div>
  );
};

const PlanDetailsHeroSection = ({ plan }) => {
  return (
    <section className="relative overflow-hidden bg-primary">
      <img
        src={PLANS_PAGE_HERO.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div aria-hidden="true" className="hero-haze-overlay" />

      <div className="relative z-10 mx-auto container px-5 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14 lg:px-10 lg:pb-12 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:gap-10 xl:gap-14">
          <div className="mx-auto w-full lg:mx-0">
            <img
              src={PLAN_PRICING_IMAGE}
              alt={`NovaSky ${plan.name}`}
              className="h-auto w-full max-w-50 object-cover sm:max-w-55"
            />
          </div>

          <div className="min-w-0">
            {plan.popular && (
              <span className="inline-block rounded-full bg-btnPrimary px-3 py-1 text-[10px] font-bold tracking-wider text-white sm:text-xs">
                POPULAR
              </span>
            )}

            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[42px]">
              NovaSky <span className="text-textAccent">{plan.name}</span>
            </h1>

            <p className="mt-4 text-base font-medium text-white sm:text-lg">
              {plan.tagline}
            </p>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white sm:text-base">
              {plan.detailBody}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8 lg:gap-x-10">
              {plan.highlights.map(({ id, icon, label }) => {
                const Icon = HIGHLIGHT_ICONS[icon];
                return (
                  <li key={id} className="flex items-center gap-2">
                    <Icon
                      size={17}
                      strokeWidth={2}
                      className="shrink-0 text-textAccent"
                    />
                    <span className="text-xs text-white sm:text-sm">
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <PlanPriceCard
            plan={plan}
            className="mx-auto w-full max-w-65 lg:mx-0 lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

export default PlanDetailsHeroSection;
