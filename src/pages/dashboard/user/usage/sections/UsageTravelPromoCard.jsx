import { Link } from "react-router";

export const UsageTravelPromoCard = () => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[#0c1a30] p-6 text-white shadow-sm">
      {/* Text Content */}
      <div className="relative z-10 max-w-[280px] space-y-2">
        <h4 className="text-base font-bold tracking-tight text-white">
          Travel with peace of mind
        </h4>
        <p className="text-xs font-normal leading-relaxed text-slate-300/80">
          Activate a roaming option and enjoy your trip abroad.
        </p>

        <div className="pt-2">
          <Link
            to="/dashboard/user/plans-options"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1e60ff] px-4 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-blue-600 active:scale-95"
          >
            Discover our options{" "}
            <span className="text-sm leading-none">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Plane and Loop Dotted Line Graphic */}

      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] flex items-center justify-end">
        <img
          src="/plane.png"
          alt="Travel Graphic"
          className="h-full w-auto object-contain object-right"
        />
      </div>
    </section>
  );
};

export default UsageTravelPromoCard;
