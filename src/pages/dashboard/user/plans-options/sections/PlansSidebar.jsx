import { Link } from "react-router";
import {
  BarChart3,
  ChevronRight,
  FileText,
  MessageCircle,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

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
      <h3 className="text-base font-bold text-primary">Need help?</h3>
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

const PlansSidebar = () => (
  <div className="space-y-6">
    <PlanSummaryWidget />
    <WhyUpgradeWidget />
    <NeedHelpWidget />
  </div>
);

export default PlansSidebar;
