import { Link } from "react-router";
import { Clock3 } from "lucide-react";
import { USER_OVERVIEW } from "@/config/userOverview";

const ITEM_THEMES = {
  data: {
    indicator: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  calls: {
    indicator: "bg-[#258bf5]",
    bar: "bg-[#258bf5]",
  },
  sms: {
    indicator: "bg-[#a855f7]",
    bar: "bg-[#a855f7]",
  },
};

const UsageCard = () => {
  const { usage } = USER_OVERVIEW;

  return (
    <section className="group relative rounded-xl border border-gray-100 bg-white p-4 sm:p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight text-[#0b1736]">
          My usage
        </h3>
        <Link
          to={usage.detailsPath}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#258bf5] transition-opacity hover:opacity-80 shrink-0"
        >
          <span>Details</span>
          <span className="text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 lg:gap-6">
        {usage.items.map((item) => {
          const theme = ITEM_THEMES[item.id] ?? {
            indicator: "bg-blue-500",
            bar: "bg-blue-500",
          };

          const hasSlash = item.value?.includes("/");
          let mainVal = item.value;
          let totalVal = "";

          if (hasSlash) {
            const parts = item.value.split("/");
            mainVal = parts[0]?.trim();
            totalVal = parts[1]?.trim();
          }

          return (
            <div key={item.id} className="flex flex-col min-w-0 overflow-hidden">
              {/* Label with colored vertical indicator */}
              <div className="flex items-center gap-2 min-w-0">
                <span className={`h-4 w-[2.5px] shrink-0 rounded-full ${theme.indicator}`} />
                <span className="text-xs sm:text-sm font-semibold text-[#0b1736] truncate">
                  {item.label}
                </span>
              </div>

              {/* Big Metric Value */}
              <div className="mt-2 flex items-baseline min-w-0 gap-x-1 overflow-hidden">
                <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#0b1736] truncate">
                  {mainVal}
                </span>
                {hasSlash && (
                  <span className="text-xs font-normal text-gray-400 shrink-0">
                    /{totalVal}
                  </span>
                )}
              </div>

              {/* Sub-label */}
              <p className="mt-1 text-xs font-medium text-[#0b1736]/90 truncate">
                {item.remainingLabel}
              </p>

              {/* Progress Bar */}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${theme.bar}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Caption / Hint */}
              <p className="mt-1.5 text-[11px] sm:text-xs text-gray-400 truncate">{item.hint}</p>
            </div>
          );
        })}
      </div>

      {/* Renewal info banner */}
      <div className="mt-6 flex items-center gap-2.5 rounded-xl bg-[#eff6ff] px-3.5 py-2.5 sm:px-4 sm:py-3">
        <Clock3 size={16} className="shrink-0 text-[#258bf5]" />
        <p className="text-xs sm:text-sm font-medium text-[#258bf5]">
          {usage.renewMessage}
        </p>
      </div>
    </section>
  );
};

export default UsageCard;
