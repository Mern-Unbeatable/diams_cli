import { Link } from "react-router";

 import travelPlaneGraphic from "/plane.png";

export const UsageTravelPromoCard = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#0c1a30] p-6 text-white shadow-sm">
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
            Discover our options <span className="text-sm leading-none">&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Plane and Loop Dotted Line Graphic */}
      {/* অপশন ১: যদি ইমেজ ফাইল ব্যবহার করতে চান (src পরিবর্তন করে নিন) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] flex items-center justify-end">
        {/* <img 
          src="/assets/plane-loop.png" 
          alt="Travel Graphic" 
          className="h-full w-auto object-contain object-right" 
        /> */}

        {/* অপশন ২: ইমেজ ফাইল না থাকলেও হুবহু একই লুক দেওয়ার জন্য রেডিমেড SVG গ্রাফিক্স */}
        <svg
          viewBox="0 0 200 130"
          className="h-full w-full object-contain overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Looped dashed path */}
          <path
            d="M 200 130 Q 140 100 120 75 C 95 40 70 50 75 80 C 80 110 115 110 130 90 C 145 70 155 45 170 30"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />

          {/* Small loop ring on trajectory */}
          <ellipse
            cx="135"
            cy="84"
            rx="6"
            ry="4"
            transform="rotate(-30 135 84)"
            stroke="rgba(255, 255, 255, 0.6)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />

          {/* Airplane SVG at top right */}
          <g transform="translate(162, 18) rotate(45) scale(0.9)">
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="white"
            />
          </g>
        </svg>
      </div>
    </section>
  );
};

export default UsageTravelPromoCard;