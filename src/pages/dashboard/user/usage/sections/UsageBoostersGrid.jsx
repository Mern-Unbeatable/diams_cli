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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {boosters.map((booster) => (
          <div
            key={booster.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div>
              <h4 className="text-sm font-bold text-primary">{booster.amount}</h4>
              <p className="mt-0.5 text-[10px] text-primary/45">{booster.validity}</p>
              <p className="mt-2 text-xs font-bold text-primary">
                CHF {booster.price}
              </p>
            </div>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
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
