import { Headset, MessageSquare, Search } from "lucide-react";
import { useState } from "react";

export const SupportHeroCard = ({ banner, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-[#eef7ff] via-[#f3f9ff] to-[#e1f1fe] p-6 sm:p-7 shadow-xs">
      <div className="relative z-10 max-w-lg space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-primary">
          {banner?.title || "How can we help you today?"}
        </h3>
        <p className="text-xs sm:text-sm text-primary/60">
          {banner?.subtitle ||
            "Search our help center or choose a topic below."}
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="pt-2">
          <div className="relative flex items-center max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={banner?.placeholder || "Search for help articles..."}
              className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-xs font-medium text-primary shadow-xs transition-colors placeholder:text-primary/40 focus:border-btnPrimary focus:outline-none focus:ring-2 focus:ring-btnPrimary/15"
            />
            <button
              type="submit"
              className="absolute right-2.5 flex h-6 w-6 items-center justify-center rounded-lg text-primary/40 hover:text-btnPrimary transition-colors"
              aria-label="Search help articles"
            >
              <Search size={15} />
            </button>
          </div>
        </form>
      </div>

      {/* Headset & Chat Bubble Illustration Vector */}
      <div className="pointer-events-none absolute -right-4 -bottom-6 sm:right-6 sm:bottom-2 opacity-80 sm:opacity-100 flex items-center">
        <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center">
          {/* Glowing Aura */}
          <div className="absolute inset-0 rounded-full bg-sky-200/50 blur-xl" />

          {/* SVG Headset Art */}
          <svg
            viewBox="0 0 120 120"
            className="h-24 w-24 sm:h-28 sm:w-28 drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Headband */}
            <path
              d="M24 64C24 44.1178 40.1178 28 60 28C79.8822 28 96 44.1178 96 64"
              stroke="#0284c7"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Left Ear Cushion */}
            <rect
              x="16"
              y="54"
              width="14"
              height="28"
              rx="7"
              fill="#00183c"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Right Ear Cushion */}
            <rect
              x="90"
              y="54"
              width="14"
              height="28"
              rx="7"
              fill="#00183c"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            {/* Microphone Arm */}
            <path
              d="M92 74C92 86 80 94 66 94H62"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Mic Tip */}
            <rect x="54" y="90" width="8" height="8" rx="4" fill="#00183c" />
          </svg>

          {/* Speech Bubble */}
          <div className="absolute -top-1 right-1 flex h-9 w-11 items-center justify-center rounded-xl bg-white shadow-lg border border-sky-100">
            <span className="flex items-center gap-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-btnPrimary animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-btnPrimary animate-pulse delay-100" />
              <span className="h-1.5 w-1.5 rounded-full bg-btnPrimary animate-pulse delay-200" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
