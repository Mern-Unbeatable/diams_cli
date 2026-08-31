import {
  BarChart3,
  Globe,
  MessageCircle,
  Phone,
  Voicemail,
  Wifi,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const FEATURE_ICONS = {
  barChart: BarChart3,
  phone: Phone,
  message: MessageCircle,
  globe: Globe,
  voicemail: Voicemail,
  wifi: Wifi,
};

const CurrentPlanCard = () => {
  const { currentPlan } = USER_PLANS_OPTIONS;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              YOUR CURRENT PLAN
            </p>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
                {currentPlan.name}
              </h3>
              <span className="rounded bg-btnPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
                {currentPlan.networkBadge}
              </span>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-2xl font-bold text-primary">CHF {currentPlan.price}</span>
            <span className="text-xs text-primary/50"> / month</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {currentPlan.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon] ?? Wifi;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/40 p-4 text-center"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef7ff] text-btnPrimary">
                  <Icon size={16} />
                </span>
                <p className="mt-3 font-semibold text-primary text-sm sm:text-base leading-tight">
                  {feature.value}
                </p>
                <p className="mt-0.5 text-[10px] font-bold text-primary/45 tracking-wide">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[#dbeafe] bg-[#eef7ff] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2 text-sm text-primary/70">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-btnPrimary shadow-sm">
            <span className="text-[10px] font-bold">ℹ</span>
          </span>
          <span>
            Your plan will renew on{" "}
            <span className="font-semibold text-primary">{currentPlan.renewDate}</span>{" "}
            <span className="text-primary/55">({currentPlan.renewHint})</span>.
          </span>
        </p>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          Plan details
        </button>
      </div>
    </section>
  );
};

export default CurrentPlanCard;
