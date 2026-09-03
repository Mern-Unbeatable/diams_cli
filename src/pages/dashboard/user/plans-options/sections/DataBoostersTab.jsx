import { Clock, Plus, Zap } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

export const DataBoosterStatusCard = () => {
  const { dataBoostersStatus } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 space-y-5">
      {/* Header Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
            {dataBoostersStatus.statusLabel}
          </span>
          <span className="rounded-full bg-[#111827] px-2.5 py-0.5 text-[10px] font-semibold text-white">
            {dataBoostersStatus.planBadge}
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-700 w-fit">
          <Clock size={13} className="shrink-0" />
          <span>{dataBoostersStatus.renewsHint}</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-primary sm:text-5xl">
          {dataBoostersStatus.availableData}
        </span>
        <span className="text-sm font-semibold text-primary/60">
          {dataBoostersStatus.availableDataLabel}
        </span>
      </div>

      {/* Progress & Action Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-primary/60">
              {dataBoostersStatus.usedText}
            </span>
            <span className="text-red-500 font-bold">
              {dataBoostersStatus.usedPercent} used
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 w-[95%]" />
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-btnPrimary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Extra Booster
        </button>
      </div>
    </section>
  );
};

export const DataBoosterComparisonTable = () => {
  const { dataBoostersTable = [] } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sky-500">
          <Zap size={18} strokeWidth={2.5} />
        </span>
        <h3 className="text-xs font-bold tracking-wider text-primary uppercase">
          QUICK COMPARISON TABLE
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[10px] font-bold uppercase tracking-wider text-primary/45">
              <th className="pb-3 font-bold">DATA AMOUNT</th>
              <th className="pb-3 font-bold">PRICE</th>
              <th className="pb-3 font-bold">VALIDITY</th>
              <th className="pb-3 font-bold">SPEED</th>
              <th className="pb-3 font-bold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dataBoostersTable.map((row) => (
              <tr key={row.id} className="group">
                <td className="py-4 text-sm font-bold text-primary">
                  <div className="flex items-center gap-2">
                    <span>{row.dataAmount}</span>
                    {row.isPopular && (
                      <span className="rounded bg-[#dff3f9] px-2 py-0.5 text-[9px] font-bold text-[#1aa0c8] uppercase tracking-wide">
                        POPULAR
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 text-sm font-bold text-sky-500">
                  CHF {row.price}
                </td>
                <td className="py-4 text-xs font-semibold text-primary/80">
                  {row.validity}
                </td>
                <td className="py-4 text-xs text-primary/55">{row.speed}</td>
                <td className="py-4 text-right">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg bg-btnPrimary px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
                  >
                    + Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const DataBoostersTab = () => (
  <div className="space-y-6">
    <DataBoosterStatusCard />
    <DataBoosterComparisonTable />
  </div>
);

export default DataBoostersTab;
