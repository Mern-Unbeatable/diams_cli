import { POPULAR_PLANS_DATA } from "./reportsData";

const MostPopularPlansCard = () => {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Most Popular Plans
        </h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Plan distribution across active customers.
        </p>

        {/* Progress Bars List */}
        <div className="mt-6 space-y-6">
          {POPULAR_PLANS_DATA.map((plan, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{plan.name}</span>
                <span className="font-bold text-slate-900">{plan.count}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${plan.color}`}
                  style={{ width: `${plan.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MostPopularPlansCard;
