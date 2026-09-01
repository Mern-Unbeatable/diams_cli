import { Link } from "react-router";
import { Plane } from "lucide-react";

export const UsageTravelPromoCard = () => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#0b1329] p-5 text-white shadow-md">
      <div className="relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold">Travel with peace of mind</h4>
          <Plane size={18} className="shrink-0 text-white/80" />
        </div>
        <p className="max-w-50 text-xs leading-relaxed text-white/60">
          Activate a roaming option and enjoy your trip abroad.
        </p>

        <Link
          to="/dashboard/user/plans-options"
          className="inline-flex items-center gap-1 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
        >
          Discover our options →
        </Link>
      </div>

      {/* Dotted trajectory graphic */}
      <div className="pointer-events-none absolute right-2 bottom-2 opacity-20">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
          <path
            d="M10 70 C 40 10, 80 80, 110 20"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </section>
  );
};

export default UsageTravelPromoCard;
