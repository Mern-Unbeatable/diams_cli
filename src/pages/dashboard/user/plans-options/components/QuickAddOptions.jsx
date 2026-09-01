import { Link } from "react-router";
import {
  BarChart3,
  Globe,
  MessageCircle,
  Phone,
  Plus,
  Voicemail,
  Wifi,
  Instagram,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

// Social Media Icons (SVG for accurate look)
const WhatsAppIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#25D366">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.795.856 3.183 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.767-5.767-5.767zm3.376 8.212c-.14.396-.709.728-1.026.772-.303.042-.693.072-2.222-.56-1.954-.808-3.21-2.8-3.308-2.929-.098-.129-.788-1.047-.788-1.996 0-.949.497-1.414.673-1.607.176-.193.385-.241.513-.241.129 0 .257.001.369.006.118.006.275-.045.431.33.16.386.547 1.334.595 1.431.048.097.08.21.016.338-.064.129-.096.21-.192.322-.096.113-.203.252-.29.338-.096.096-.197.2-.085.393.113.193.502.828 1.077 1.341.739.66 1.363.864 1.556.96.193.097.306.081.418-.048.113-.129.482-.563.611-.756.129-.193.257-.161.434-.096.177.064 1.125.53 1.318.627.193.096.321.144.369.225.048.08.048.467-.092.863z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="#000000">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.48 2.77 1.4-.04 2.66-.99 3.04-2.33.15-.48.2-1 .19-1.5-.02-3.86-.01-7.72-.01-11.58.01-.01 0-.02 0-.03z" />
  </svg>
);

const FEATURE_ICONS = {
  barChart: BarChart3,
  phone: Phone,
  message: MessageCircle,
  globe: Globe,
  voicemail: Voicemail,
  wifi: Wifi,
};

export const QuickAddOptions = () => {
  const { quickAdd } = USER_PLANS_OPTIONS;

  return (
    <div className="w-full space-y-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#1e293b]">Quick add options</h3>
        <Link
          to="/dashboard/user/plans-options"
          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
        >
          View all options <span>&rarr;</span>
        </Link>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickAdd.slice(0, 4).map((item) => {
          const isSocial = item.icon === "social";
          const Icon = FEATURE_ICONS[item.icon] ?? Wifi;

          return (
            <div
              key={item.id}
              className="relative flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Left Side Icon */}
              {isSocial ? (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#fdf497] via-[#d6249f] to-[#285AEB] p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white text-[#d6249f]">
                    <Instagram className="h-6 w-6" strokeWidth={2} />
                  </div>
                </div>
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ebf4fd] text-[#0f172a]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
              )}

              {/* Content Area */}
              <div className="min-w-0 flex-1 pr-7">
                <h4 className="truncate text-[13px] font-bold text-[#1e293b] leading-tight">
                  {item.title}
                </h4>

                {/* Subtitle / Description */}
                {isSocial ? (
                  <div className="my-1 flex items-center gap-1.5">
                    <WhatsAppIcon />
                    <FacebookIcon />
                    <TikTokIcon />
                  </div>
                ) : (
                  <p className="truncate text-[11px] font-medium text-gray-400 leading-snug">
                    {item.description}
                  </p>
                )}

                {/* Price */}
                <p className="mt-1 text-[13px] font-bold text-[#1e293b]">
                  CHF {item.price}
                </p>
              </div>

              {/* Add Button */}
              <button
                type="button"
                className="absolute right-3.5 bottom-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm transition-transform hover:scale-110 active:scale-95"
                aria-label={`Add ${item.title}`}
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickAddOptions;