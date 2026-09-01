import { Link } from "react-router";
import { USER_USAGE } from "@/config/userUsage";

export const UsagePlanBanner = () => {
  const { currentPlan } = USER_USAGE;

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-[#0C1D42] p-5 text-white shadow-lg shadow-slate-900/10 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
          CURRENT PLAN
        </p>
        <div className="mt-1 flex items-center gap-2">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {currentPlan.name}
          </h3>
          <span className="rounded bg-btnPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
            {currentPlan.networkBadge}
          </span>
        </div>
        <p className="mt-1 text-xs text-white/60">
          Next billing cycle: {currentPlan.renewDate}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/dashboard/user/plans-options"
          className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
        >
          Change plan
        </Link>
        <Link
          to="/dashboard/user/plans-options"
          className="rounded-xl bg-btnPrimary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
        >
          View plan details
        </Link>
      </div>
    </section>
  );
};

export default UsagePlanBanner;
