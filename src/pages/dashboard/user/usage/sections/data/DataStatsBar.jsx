import { Info } from "lucide-react";

const DataStatsBar = ({ usageSummary, currentPlan }) => {
  return (
    <div className="flex-1 space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-primary">
          {usageSummary.usedPercentage}% used
        </h3>
        <p className="mt-0.5 text-xs text-primary/55">
          {usageSummary.remainingData} GB remaining
        </p>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-btnPrimary transition-all duration-500"
          style={{ width: `${usageSummary.usedPercentage}%` }}
        />
      </div>

      <div className="flex items-center gap-2.5 rounded-xl border border-blue-100/60 bg-[#eef7ff]/60 px-4 py-3 text-xs text-primary/70">
        <Info size={16} className="shrink-0 text-btnPrimary" />
        <span>
          Your plan will renew in{" "}
          <span className="font-semibold text-primary">
            {currentPlan.renewDays} days
          </span>{" "}
          ({currentPlan.renewDate} at {currentPlan.renewTime})
        </span>
      </div>
    </div>
  );
};

export default DataStatsBar;
