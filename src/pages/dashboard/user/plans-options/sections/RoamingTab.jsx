import { Zap } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";
import CurrentPlanCard from "./CurrentPlanCard";

export const QuickComparisonTable = () => {
  const { roamingTable = [] } = USER_PLANS_OPTIONS;

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
              <th className="pb-3 font-bold">DESCRIPTION</th>
              <th className="pb-3 font-bold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {roamingTable.map((row) => (
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
                <td className="py-4 text-xs text-primary/55">
                  {row.description}
                </td>
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

const RoamingTab = () => (
  <div className="space-y-6">
    <CurrentPlanCard />
    <QuickComparisonTable />
  </div>
);

export default RoamingTab;
