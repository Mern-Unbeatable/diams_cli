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
    <section className="group relative rounded-xl border border-gray-100 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-xl sm:text-[22px] font-bold tracking-tight text-[#0b1736]">
          My usage
        </h3>
        <Link
          to={usage.detailsPath}
          className="inline-flex items-center gap-1 text-sm sm:text-[15px] font-semibold text-[#258bf5] transition-opacity hover:opacity-80"
        >
          <span>Details</span>
          <span className="text-base leading-none transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-6 lg:gap-8">
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
            <div key={item.id} className="flex flex-col">
              {/* Label with colored vertical indicator */}
              <div className="flex items-center gap-2">
                <span className={`h-4 w-[2.5px] rounded-full ${theme.indicator}`} />
                <span className="text-sm sm:text-[15px] font-semibold text-[#0b1736]">
                  {item.label}
                </span>
              </div>

              {/* Big Metric Value */}
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl sm:text-[26px] font-bold tracking-tight text-[#0b1736]">
                  {mainVal}
                </span>
                {hasSlash && (
                  <span className="ml-1 text-sm sm:text-base font-normal text-gray-400">
                    /{totalVal}
                  </span>
                )}
              </div>

              {/* Sub-label */}
              <p className="mt-1 text-xs sm:text-[13px] font-medium text-[#0b1736]/90">
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
              <p className="mt-1.5 text-xs text-gray-400">{item.hint}</p>
            </div>
          );
        })}
      </div>

      {/* Renewal info banner */}
      <div className="mt-6 flex items-center gap-2.5 rounded-xl bg-[#eff6ff] px-4 py-3">
        <Clock3 size={16} className="shrink-0 text-[#258bf5]" />
        <p className="text-xs sm:text-sm font-medium text-[#258bf5]">
          {usage.renewMessage}
        </p>
      </div>
    </section>
  );
};

export default UsageCard;
