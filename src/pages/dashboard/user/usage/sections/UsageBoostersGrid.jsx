import { Link } from "react-router";
import { Plus } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageBoostersGrid = () => {
  const { boosters } = USER_USAGE;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-primary">Data boosters</h3>
        <Link
          to="/dashboard/user/plans-options"
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          View all boosters →
        </Link>
      </div>

      <div className="grid gap-3.5 grid-cols-2 sm:grid-cols-2 xl:grid-cols-4">
        {boosters.map((booster) => (
          <div
            key={booster.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-3.5 sm:p-4 min-w-0"
          >
            <div className="min-w-0 flex-1 pr-2">
              <h4 className="text-sm font-bold text-primary truncate">
                {booster.amount}
              </h4>
              <p className="mt-0.5 text-[10px] text-primary/45 truncate">
                {booster.validity}
              </p>
              <p className="mt-1.5 text-xs font-bold text-primary truncate">
                CHF {booster.price}
              </p>
            </div>

            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-label={`Add ${booster.amount}`}
            >
              <Plus size={15} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageBoostersGrid;
