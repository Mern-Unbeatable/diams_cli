import { Calendar, MessageSquare, Phone, Signal, Tag } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

export const PlanSummaryWidget = () => {
  const { currentPlan } = USER_PLANS_OPTIONS;

  return (
    <section className="relative rounded-3xl bg-[#09235e] p-6 text-white shadow-xl shadow-blue-950/20 sm:p-7">
      <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
        Plan Summary
      </h3>

      {/* Current Plan */}
      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-blue-200/60">
          CURRENT PLAN
        </p>
        <div className="mt-1 flex items-center gap-2.5">
          <h4 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            {currentPlan.name}
          </h4>
          <span className="rounded-md bg-[#258bf5] px-2 py-0.5 text-[10px] font-bold text-white">
            {currentPlan.networkBadge}
          </span>
        </div>
      </div>

      {/* Info List */}
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-100/70">
            <Tag size={14} className="shrink-0 text-blue-200" />
            <span>Price</span>
          </div>
          <span className="font-semibold text-white">
            CHF {currentPlan.price} / month
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-100/70">
            <Calendar size={14} className="shrink-0 text-blue-200" />
            <span>Next billing date</span>
          </div>
          <span className="font-semibold text-white">
            {currentPlan.renewDate}
          </span>
        </div>

        <div className="my-3 border-t border-white/10" />

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-100/70">
            <Signal size={14} className="shrink-0 text-blue-200" />
            <span>Data</span>
          </div>
          <span className="font-bold text-white">80 GB</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-100/70">
            <Phone size={14} className="shrink-0 text-blue-200" />
            <span>Calls</span>
          </div>
          <span className="font-bold text-white">Unlimited</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-blue-100/70">
            <MessageSquare size={14} className="shrink-0 text-blue-200" />
            <span>SMS</span>
          </div>
          <span className="font-bold text-white">Unlimited</span>
        </div>
      </div>

      {/* Button */}
      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center rounded-full border border-white/15 bg-white/10 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-white/20 active:scale-[0.99] sm:text-sm"
      >
        Manage my plan
      </button>
    </section>
  );
};

export default PlanSummaryWidget;
