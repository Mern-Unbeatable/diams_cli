import {
  Info,
  MessageSquareMore,
  Phone,
  Signal,
  Sparkles,
  Voicemail,
  Wifi,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const parseFeature = (feature) => {
  if (feature.value && feature.label && feature.icon) {
    return feature;
  }
  const text = feature.label || "";
  let icon = Signal;
  let value = "";
  let label = "";

  if (
    text.toLowerCase().includes("data") ||
    text.toLowerCase().includes("gb")
  ) {
    icon = Signal;
    const parts = text.split(/(?<=\bGB\b)\s*/i);
    value = parts[0] || text;
    label = parts[1] || "Data";
  } else if (text.toLowerCase().includes("calls")) {
    icon = Phone;
    value = text.replace(/calls/i, "").trim() || "Unlimited";
    label = "Calls";
  } else if (text.toLowerCase().includes("sms")) {
    icon = MessageSquareMore;
    value = text.replace(/sms/i, "").trim() || "Unlimited";
    label = "SMS";
  } else if (text.toLowerCase().includes("voicemail")) {
    icon = Voicemail;
    value = text.replace(/voicemail/i, "").trim() || "Included";
    label = "Voicemail";
  } else if (text.toLowerCase().includes("hotspot")) {
    icon = Wifi;
    value = text.replace(/hotspot/i, "").trim() || "Included";
    label = "Hotspot";
  } else if (
    text.toLowerCase().includes("priority") ||
    text.toLowerCase().includes("network")
  ) {
    icon = Sparkles;
    value = "Priority";
    label = "Network";
  } else {
    const parts = text.split(" ");
    value = parts[0] || "";
    label = parts.slice(1).join(" ") || "";
  }

  return { icon, value, label };
};

export const PlanComparisonGrid = () => {
  const { plans } = USER_PLANS_OPTIONS;

  return (
    <section>
      <h3 className="text-xl font-bold tracking-tight text-[#0b1736] sm:text-[22px]">
        Choose a new plan
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 pt-2">
        {plans.map((plan) => {
          const isSelected = plan.isCurrent;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-2xl bg-white p-5 transition-all min-w-0 ${
                isSelected
                  ? "border-2 border-[#258bf5] shadow-md"
                  : "border border-gray-100/90 shadow-2xs hover:border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#258bf5] px-4 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm whitespace-nowrap z-10">
                  MOST POPULAR
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <h4 className="text-base sm:text-lg font-extrabold tracking-tight text-[#0b1736] truncate">
                    {plan.name}
                  </h4>
                  {plan.networkBadge === "5G" ? (
                    <span className="rounded-md bg-[#258bf5] px-2 py-0.5 text-[10px] font-bold text-white shrink-0">
                      5G
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-gray-400 shrink-0">
                      {plan.networkBadge}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0b1736] whitespace-nowrap">
                    CHF {plan.price}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-gray-400 whitespace-nowrap">
                    / month
                  </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {plan.features.map((feature, index) => {
                    const { icon: Icon, value, label } = parseFeature(feature);

                    return (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-xs sm:text-sm min-w-0"
                      >
                        <Icon
                          size={16}
                          className="shrink-0 text-[#0b1736]"
                          strokeWidth={1.8}
                        />
                        <span className="flex flex-wrap items-center gap-1 leading-snug min-w-0">
                          <span className="font-semibold text-[#475569] shrink-0">{value}</span>
                          <span className="font-normal text-[#475569] truncate min-w-0">
                            {label}
                          </span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6">
                {isSelected ? (
                  <button
                    type="button"
                    className="w-full rounded-full bg-[#258bf5] py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
                  >
                    Current plan
                  </button>
                ) : (
                  <button
                    type="button"
                    className="w-full rounded-full border border-blue-200 bg-white py-2.5 text-xs sm:text-sm font-semibold text-[#258bf5] shadow-2xs transition-colors hover:bg-blue-50/50"
                  >
                    Select plan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs font-normal text-gray-400">
        <Info size={14} className="shrink-0 text-[#258bf5]" strokeWidth={2.2} />
        <span>
          All plans include eSIM, 5G access and 24/7 customer support.
        </span>
      </p>
    </section>
  );
};

export default PlanComparisonGrid;
