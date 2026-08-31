import { Link } from "react-router";
import {
  BarChart3,
  Globe,
  MessageCircle,
  Phone,
  Plus,
  Voicemail,
  Wifi,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";
import CurrentPlanCard from "./CurrentPlanCard";

const FEATURE_ICONS = {
  barChart: BarChart3,
  phone: Phone,
  message: MessageCircle,
  globe: Globe,
  voicemail: Voicemail,
  wifi: Wifi,
};

const SocialIcons = () => (
  <div className="grid grid-cols-2 gap-0.5 w-8 h-8 p-0.5 bg-gray-50 rounded-lg shrink-0 border border-gray-100">
    <div className="text-[7px] flex items-center justify-center font-bold text-pink-600 bg-pink-50/50 rounded-sm leading-none">IG</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-emerald-600 bg-emerald-50/50 rounded-sm leading-none">WA</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-blue-600 bg-blue-50/50 rounded-sm leading-none">FB</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-gray-800 bg-gray-200/50 rounded-sm leading-none">TT</div>
  </div>
);

export const PlanComparisonGrid = () => {
  const { plans } = USER_PLANS_OPTIONS;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-primary">Choose a new plan</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = plan.isCurrent;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl bg-white p-5 pt-8 flex flex-col justify-between border-2 transition-all ${
                isSelected
                  ? "border-btnPrimary shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-4 py-1 text-[10px] font-bold text-white tracking-wide shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-primary text-base">{plan.name}</h4>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      plan.networkBadge === "5G"
                        ? "bg-[#eef7ff] text-btnPrimary"
                        : "bg-gray-100 text-primary/60"
                    }`}
                  >
                    {plan.networkBadge}
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">CHF {plan.price}</span>
                  <span className="text-xs text-primary/45"> / month</span>
                </div>

                <ul className="mt-6 space-y-3.5">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2.5 text-xs text-primary/75">
                      <span className="flex h-1.5 w-1.5 shrink-0 rounded-full bg-btnPrimary/70" />
                      <span>{feature.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-btnPrimary text-white shadow-sm hover:opacity-90"
                      : "border border-btnPrimary text-btnPrimary hover:bg-blue-50/40"
                  }`}
                >
                  {isSelected ? "Current plan" : "Select plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-primary/45 flex items-center gap-1.5">
        <span className="flex h-1.5 w-1.5 rounded-full bg-btnPrimary" />
        * All plans include eSIM, 5G access and 24/7 customer support.
      </p>
    </div>
  );
};

export const QuickAddOptions = () => {
  const { quickAdd } = USER_PLANS_OPTIONS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">Quick add options</h3>
        <Link
          to="/dashboard/user/plans-options"
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          View all options →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickAdd.slice(0, 4).map((item) => {
          const isSocial = item.icon === "social";
          const Icon = FEATURE_ICONS[item.icon] ?? Wifi;

          return (
            <div
              key={item.id}
              className="relative flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"
            >
              {isSocial ? (
                <SocialIcons />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
                  <Icon size={15} />
                </span>
              )}

              <div className="min-w-0 flex-1 pr-6">
                <h4 className="truncate text-xs font-bold text-primary" title={item.title}>
                  {item.title}
                </h4>
                <p className="mt-0.5 truncate text-[10px] text-primary/45">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-primary">CHF {item.price}</p>
              </div>

              <button
                type="button"
                className="absolute bottom-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
                aria-label={`Add ${item.title}`}
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ChangePlanTab = () => (
  <div className="space-y-6">
    <CurrentPlanCard />
    <PlanComparisonGrid />
    <QuickAddOptions />
  </div>
);

export default ChangePlanTab;
