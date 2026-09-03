import { Link } from "react-router";
import { Zap } from "lucide-react";

export const UsageNeedMoreBanner = () => (
  <section className="flex flex-col gap-3 rounded-xl border border-amber-200/80 bg-amber-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
        <Zap size={18} />
      </span>
      <div>
        <h4 className="text-xs font-bold text-primary">Need more data?</h4>
        <p className="text-[11px] text-primary/55">
          Add a data booster to stay connected.
        </p>
      </div>
    </div>

    <Link
      to="/dashboard/user/plans-options"
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-btnPrimary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
    >
      Add a booster
    </Link>
  </section>
);

export default UsageNeedMoreBanner;
