import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { POPULAR_PLANS } from "./overviewData";

const AdminPopularPlansCard = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      <div>
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard/admin/plans"
            className="group flex items-center gap-2 hover:text-sky-600 transition-colors"
          >
            <h2 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-sky-600">
              Most Popular Plans
            </h2>
            <span className="inline-flex items-center text-xs font-semibold text-sky-500 group-hover:translate-x-0.5 transition-all">
              Plans <ArrowRight size={12} className="ml-0.5" />
            </span>
          </Link>
        </div>
        <p className="mt-0.5 text-xs text-slate-400">
          Plan distribution across active customers.
        </p>

        <div className="mt-6 space-y-5">
          {POPULAR_PLANS.map((plan) => (
            <Link
              key={plan.name}
              to="/dashboard/admin/plans"
              className="group block space-y-1.5 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 sm:text-[13px]">
                <span className="font-semibold text-slate-800 group-hover:text-sky-600 transition-colors">
                  {plan.name}
                </span>
                <span className="text-slate-500">{plan.count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500 group-hover:brightness-110"
                  style={{
                    width: `${plan.percentage}%`,
                    backgroundColor: plan.color,
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPopularPlansCard;
