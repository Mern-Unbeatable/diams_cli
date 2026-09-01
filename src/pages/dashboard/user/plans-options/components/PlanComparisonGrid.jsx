import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

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
              className={`relative flex flex-col justify-between rounded-2xl bg-white p-5 pt-8 border-2 transition-all ${
                isSelected
                  ? "border-btnPrimary shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-4 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">
                  MOST POPULAR
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-primary">{plan.name}</h4>
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
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition-colors ${
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
      <p className="flex items-center gap-1.5 text-[11px] text-primary/45">
        <span className="flex h-1.5 w-1.5 rounded-full bg-btnPrimary" />
        * All plans include eSIM, 5G access and 24/7 customer support.
      </p>
    </div>
  );
};

export default PlanComparisonGrid;
