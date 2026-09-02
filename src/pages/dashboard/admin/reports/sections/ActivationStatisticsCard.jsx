import { useState } from "react";
import { ACTIVATION_STATS_DATA } from "./reportsData";

const ActivationStatisticsCard = () => {
  const [selectedStat, setSelectedStat] = useState({
    label: "Activation failed",
    value: 4,
  });

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-base font-bold text-slate-900 sm:text-lg">
          Activation Statistics
        </h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Monthly activations with hover feedback.
        </p>

        {/* Progress Bars List */}
        <div className="mt-6 space-y-5">
          {ACTIVATION_STATS_DATA.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedStat(item)}
              className="cursor-pointer space-y-1.5 transition hover:opacity-90"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{item.label}</span>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#2ea5ff] transition-all duration-500"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Info Banner */}
      <div className="mt-6 rounded-xl border border-sky-100 bg-[#f0f9ff] p-3 text-xs font-semibold text-[#0284c7]">
        Selected: {selectedStat.label} with value {selectedStat.value}
      </div>
    </div>
  );
};

export default ActivationStatisticsCard;
