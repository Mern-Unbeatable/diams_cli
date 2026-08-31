import { useState } from "react";
import { Link } from "react-router";
import {
  BarChart3,
  ChevronRight,
  FileText,
  Globe,
  Headset,
  MessageCircle,
  Phone,
  Plus,
  RefreshCw,
  Star,
  Voicemail,
  Wifi,
  Zap,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const FEATURE_ICONS = {
  barChart: BarChart3,
  phone: Phone,
  message: MessageCircle,
  globe: Globe,
  voicemail: Voicemail,
  wifi: Wifi,
};

const WHY_UPGRADE_ICONS = {
  zap: Zap,
  star: Star,
  refresh: RefreshCw,
};

const HELP_ICONS = {
  chart: BarChart3,
  doc: FileText,
  chat: MessageCircle,
};

const SocialIcons = () => (
  <div className="grid grid-cols-2 gap-0.5 w-8 h-8 p-0.5 bg-gray-50 rounded-lg shrink-0 border border-gray-100">
    <div className="text-[7px] flex items-center justify-center font-bold text-pink-600 bg-pink-50/50 rounded-sm leading-none">IG</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-emerald-600 bg-emerald-50/50 rounded-sm leading-none">WA</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-blue-600 bg-blue-50/50 rounded-sm leading-none">FB</div>
    <div className="text-[7px] flex items-center justify-center font-bold text-gray-800 bg-gray-200/50 rounded-sm leading-none">TT</div>
  </div>
);

export const PlansTabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200">
    <div className="flex gap-6 overflow-x-auto pb-px scrollbar-none">
      {USER_PLANS_OPTIONS.tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
              isActive
                ? "border-btnPrimary text-btnPrimary"
                : "border-transparent text-primary/60 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  </div>
);

export const CurrentPlanCard = () => {
  const { currentPlan } = USER_PLANS_OPTIONS;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              YOUR CURRENT PLAN
            </p>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
                {currentPlan.name}
              </h3>
              <span className="rounded bg-btnPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
                {currentPlan.networkBadge}
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl font-bold text-primary">CHF {currentPlan.price}</span>
            <span className="text-xs text-primary/50"> / month</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {currentPlan.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon] ?? Wifi;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/40 p-4 text-center"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef7ff] text-btnPrimary">
                  <Icon size={16} />
                </span>
                <p className="mt-3 font-semibold text-primary text-sm sm:text-base leading-tight">
                  {feature.value}
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-primary/45 tracking-wide">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#dbeafe] bg-[#eef7ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-sm text-primary/70">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-btnPrimary shadow-sm">
            <span className="text-[10px] font-bold">ℹ</span>
          </span>
          <span>
            Your plan will renew on{" "}
            <span className="font-semibold text-primary">{currentPlan.renewDate}</span>{" "}
            <span className="text-primary/55">({currentPlan.renewHint})</span>.
          </span>
        </p>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          Plan details
        </button>
      </div>
    </section>
  );
};

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
        {quickAdd.map((item) => {
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

export const PlanSummaryWidget = () => {
  const { currentPlan } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-2xl bg-[#0f172a] p-5 text-white sm:p-6 shadow-lg shadow-slate-900/10">
      <h3 className="text-base font-bold">Plan Summary</h3>
      
      <div className="mt-4 border-b border-white/10 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          CURRENT PLAN
        </p>
        <div className="mt-1 flex items-center justify-between">
          <h4 className="text-lg font-bold">{currentPlan.name}</h4>
          <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-bold text-white/90">
            {currentPlan.networkBadge}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-3.5">
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Price</span>
          <span className="font-semibold">CHF {currentPlan.price} / month</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Next billing date</span>
          <span className="font-semibold">{currentPlan.renewDate}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Data</span>
          <span className="font-semibold">80 GB</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">Calls</span>
          <span className="font-semibold">Unlimited</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-white/60">SMS</span>
          <span className="font-semibold">Unlimited</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center rounded-xl bg-white py-3 text-xs font-bold text-slate-900 transition-colors hover:bg-slate-50"
      >
        Manage my plan
      </button>
    </section>
  );
};

export const WhyUpgradeWidget = () => {
  const { whyUpgrade } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Why upgrade?</h3>
      <ul className="mt-4 space-y-4">
        {whyUpgrade.map((item) => {
          const Icon = WHY_UPGRADE_ICONS[item.icon] ?? Zap;

          return (
            <li key={item.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef7ff] text-btnPrimary">
                <Icon size={16} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-primary">{item.title}</h4>
                <p className="mt-0.5 text-[11px] text-primary/55 leading-normal">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const NeedHelpWidget = () => {
  const { needHelp } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary font-bold">Need help?</h3>
      <ul className="mt-3 divide-y divide-gray-100">
        {needHelp.map((item) => {
          const Icon = HELP_ICONS[item.icon] ?? MessageCircle;

          return (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3.5 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">{item.title}</p>
                  <p className="text-[10px] text-primary/45 truncate mt-0.5">{item.description}</p>
                </div>
                <ChevronRight size={15} className="shrink-0 text-primary/35" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
