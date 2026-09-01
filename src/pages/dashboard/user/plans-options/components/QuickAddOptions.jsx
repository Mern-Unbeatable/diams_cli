import { Link } from "react-router";
import {
  BarChart3,
  Globe,
  MessageCircle,
  Phone,
  Plus,
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

const SocialIcons = () => (
  <div className="grid h-8 w-8 shrink-0 grid-cols-2 gap-0.5 rounded-lg border border-gray-100 bg-gray-50 p-0.5">
    <div className="flex items-center justify-center rounded-sm bg-pink-50/50 text-[7px] font-bold text-pink-600 leading-none">
      IG
    </div>
    <div className="flex items-center justify-center rounded-sm bg-emerald-50/50 text-[7px] font-bold text-emerald-600 leading-none">
      WA
    </div>
    <div className="flex items-center justify-center rounded-sm bg-blue-50/50 text-[7px] font-bold text-blue-600 leading-none">
      FB
    </div>
    <div className="flex items-center justify-center rounded-sm bg-gray-200/50 text-[7px] font-bold text-gray-800 leading-none">
      TT
    </div>
  </div>
);

export const QuickAddOptions = () => {
  const { quickAdd } = USER_PLANS_OPTIONS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">Quick add options</h3>
        <Link
          to="/dashboard/user/plans-options"
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          View all options →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickAdd.slice(0, 4).map((item) => {
          const isSocial = item.icon === "social";
          const Icon = FEATURE_ICONS[item.icon] ?? Wifi;

          return (
            <div
              key={item.id}
              className="relative flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4"
            >
              {isSocial ? (
                <SocialIcons />
              ) : (
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
                  <Icon size={15} />
                </span>
              )}

              <div className="min-w-0 flex-1 pr-6">
                <h4 className="truncate text-xs font-bold text-primary" title={item.title}>
                  {item.title}
                </h4>
                <p className="mt-0.5 truncate text-[10px] text-primary/45">{item.description}</p>
                <p className="mt-2 text-xs font-bold text-primary">CHF {item.price}</p>
              </div>

              <button
                type="button"
                className="absolute right-4 bottom-4 flex h-7 w-7 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
                aria-label={`Add ${item.title}`}
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAddOptions;
