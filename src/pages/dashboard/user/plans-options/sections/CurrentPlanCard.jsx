import {
  Info,
  MessageSquareMore,
  Phone,
  Radio,
  Signal,
  Voicemail,
  Wifi,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const FEATURE_ICONS = {
  barChart: Signal,
  signal: Signal,
  phone: Phone,
  message: MessageSquareMore,
  globe: Radio,
  roaming: Radio,
  voicemail: Voicemail,
  wifi: Wifi,
};

export const CurrentPlanCard = () => {
  const { currentPlan } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6 sm:p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
            YOUR CURRENT PLAN
          </p>
          <div className="mt-1 flex items-center gap-2.5">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#0b1736] sm:text-3xl">
              {currentPlan.name}
            </h3>
            <span className="rounded-md bg-[#258bf5] px-2 py-0.5 text-[11px] font-bold text-white">
              {currentPlan.networkBadge}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-1 sm:text-right">
          <span className="text-2xl font-extrabold tracking-tight text-[#0b1736] sm:text-3xl">
            CHF {currentPlan.price}
          </span>
          <span className="text-sm font-normal text-gray-400"> / month</span>
        </div>
      </div>

      {/* 6 Feature Tiles */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-3.5">
        {currentPlan.features.map((feature) => {
          const Icon = FEATURE_ICONS[feature.icon] ?? Wifi;

          return (
            <div
              key={feature.id}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#fbfcfd] p-4 text-center shadow-2xs transition-all hover:bg-white hover:shadow-xs"
            >
              <Icon size={20} className="text-[#0b1736]" strokeWidth={1.8} />
              <p className="mt-2 text-sm font-bold text-[#0b1736] sm:text-[15px]">
                {feature.value}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {feature.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Renewal Pill & Details Button */}
      <div className="mt-6 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2.5 rounded-full bg-[#f0f7ff] px-5 py-3">
          <Info
            size={16}
            className="shrink-0 text-[#258bf5]"
            strokeWidth={2.2}
          />
          <p className="text-xs font-normal text-[#0b1736] sm:text-sm">
            Your plan will renew on{" "}
            <span className="font-bold text-[#0b1736]">
              {currentPlan.renewDate}
            </span>{" "}
            ({currentPlan.renewHint}).
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-full border border-blue-200 bg-white px-6 py-2.5 text-xs font-semibold text-[#258bf5] shadow-2xs transition-colors hover:bg-blue-50/50 sm:text-sm"
        >
          Plan details
        </button>
      </div>
    </section>
  );
};

export default CurrentPlanCard;
