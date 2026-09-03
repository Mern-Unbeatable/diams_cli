import { Link } from "react-router";
import { Phone, Plus, Wifi } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

// Social Media Icons
const WhatsAppMini = () => (
  <svg
    className="h-5 w-5 shrink-0 transition-transform hover:scale-110"
    viewBox="0 0 24 24"
    fill="#22c55e"
  >
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.54 1.861.855 2.795.856 3.183 0 5.768-2.587 5.768-5.766.001-3.18-2.585-5.767-5.767-5.767zm3.376 8.212c-.14.396-.709.728-1.026.772-.303.042-.693.072-2.222-.56-1.954-.808-3.21-2.8-3.308-2.929-.098-.129-.788-1.047-.788-1.996 0-.949.497-1.414.673-1.607.176-.193.385-.241.513-.241.129 0 .257.001.369.006.118.006.275-.045.431.33.16.386.547 1.334.595 1.431.048.097.08.21.016.338-.064.129-.096.21-.192.322-.096.113-.203.252-.29.338-.096.096-.197.2-.085.393.113.193.502.828 1.077 1.341.739.66 1.363.864 1.556.96.193.097.306.081.418-.048.113-.129.482-.563.611-.756.129-.193.257-.161.434-.096.177.064 1.125.53 1.318.627.193.096.321.144.369.225.048.08.048.467-.092.863z" />
  </svg>
);

const FacebookMini = () => (
  <svg
    className="h-5 w-5 shrink-0 transition-transform hover:scale-110"
    viewBox="0 0 24 24"
    fill="#1877F2"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TikTokMini = () => (
  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-black p-[3px] transition-transform hover:scale-110">
    <svg className="h-full w-full fill-white" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.48 2.77 1.4-.04 2.66-.99 3.04-2.33.15-.48.2-1 .19-1.5-.02-3.86-.01-7.72-.01-11.58.01-.01 0-.02 0-.03z" />
    </svg>
  </div>
);

const InstagramBadge = () => (
  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-pink-100/90 bg-[#fff5f6] p-2.5 shadow-2xs">
    <svg
      className="h-6 w-6 text-[#e1306c]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  </div>
);

const formatTitle = (title) => {
  if (title === "Data Booster +10GB") {
    return (
      <div className="leading-tight">
        <span className="block font-bold text-[#0b1736]">Data Booster</span>
        <span className="block font-bold text-[#0b1736]">+10GB</span>
      </div>
    );
  }
  if (title === "International calls 100 min") {
    return (
      <div className="leading-tight">
        <span className="block font-bold text-[#0b1736]">
          International calls
        </span>
        <span className="block font-bold text-[#0b1736]">100 min</span>
      </div>
    );
  }
  return (
    <span className="block font-bold text-[#0b1736] leading-tight">
      {title}
    </span>
  );
};

export const QuickAddOptions = () => {
  const { quickAdd } = USER_PLANS_OPTIONS;

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">
          Quick add options
        </h3>
        <Link
          to="/dashboard/user/plans-options"
          className="flex items-center gap-1 text-xs font-semibold text-[#258bf5] hover:underline sm:text-sm"
        >
          <span>View all options</span>
          <span className="text-base leading-none">→</span>
        </Link>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {quickAdd.slice(0, 4).map((item) => {
          const isSocial = item.icon === "social";
          const isPhone = item.icon === "phone";

          return (
            <div
              key={item.id}
              className="relative flex items-start gap-3.5 rounded-xl border border-gray-100/90 bg-white p-5 shadow-xs transition-all hover:shadow-sm"
            >
              {/* Left Side Icon Badge */}
              {isSocial ? (
                <InstagramBadge />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f7ff] text-[#0b1736] shadow-2xs">
                  {isPhone ? (
                    <Phone size={20} strokeWidth={1.8} />
                  ) : (
                    <Wifi size={20} strokeWidth={1.8} />
                  )}
                </div>
              )}

              {/* Middle Content */}
              <div className="min-w-0 flex-1 pr-8">
                <div className="text-[13px]">{formatTitle(item.title)}</div>

                {isSocial && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <WhatsAppMini />
                    <FacebookMini />
                    <TikTokMini />
                  </div>
                )}

                <p className="mt-1 truncate text-[11px] font-normal text-gray-400">
                  {item.description}
                </p>

                <p className="mt-2 text-sm font-extrabold text-[#0b1736]">
                  CHF {item.price}
                </p>
              </div>

              {/* Right Add Plus Button at the Bottom Right Corner */}
              <button
                type="button"
                className="absolute right-4 bottom-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#258bf5] text-white shadow-xs transition-transform hover:scale-105 active:scale-95 sm:right-5 sm:bottom-5"
                aria-label={`Add ${item.title}`}
              >
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickAddOptions;
