import { Link } from "react-router";
import {
  ChevronRight,
  Globe,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Phone,
  Plane,
  Voicemail,
  Wifi,
} from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageSidebar = () => {
  const { sidebarSummary, activeOptions, helpLinks } = USER_USAGE;

  return (
    <div className="space-y-6">
      {/* Widget 1: Your Plan Summary */}
      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold text-primary">Your plan summary</h3>

        <div className="space-y-4">
          {sidebarSummary.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {item.id === "data" && <Wifi size={14} className="text-btnPrimary" />}
                  {item.id === "calls" && <Phone size={14} className="text-emerald-500" />}
                  {item.id === "sms" && <MessageSquare size={14} className="text-purple-500" />}
                  {item.id === "hotspot" && <Wifi size={14} className="text-primary/45" />}
                  <span className="font-semibold text-primary">{item.label}</span>
                </div>
                <span
                  className={`font-semibold ${
                    item.isLink ? "text-btnPrimary" : "text-primary/70"
                  }`}
                >
                  {item.value}
                </span>
              </div>

              {!item.isLink && (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.style}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Widget 2: Active Options */}
      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary">Active options</h3>
          <Link
            to="/dashboard/user/plans-options"
            className="text-xs font-semibold text-btnPrimary hover:underline"
          >
            View all →
          </Link>
        </div>

        <ul className="space-y-3">
          {activeOptions.map((opt) => (
            <li key={opt.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-primary/80">
                {opt.icon === "globe" && <Globe size={15} className="text-primary/45" />}
                {opt.icon === "phone" && <Phone size={15} className="text-primary/45" />}
                {opt.icon === "voicemail" && <Voicemail size={15} className="text-primary/45" />}
                <span className="font-semibold">{opt.name}</span>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {opt.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Widget 3: Travel Promo Card */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0b1329] p-5 text-white shadow-md">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Travel with peace of mind</h4>
            <Plane size={18} className="shrink-0 text-white/80" />
          </div>
          <p className="max-w-50 text-xs leading-relaxed text-white/60">
            Activate a roaming option and enjoy your trip abroad.
          </p>

          <Link
            to="/dashboard/user/plans-options"
            className="inline-flex items-center gap-1 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
          >
            Discover our options →
          </Link>
        </div>

        {/* Dotted trajectory graphic */}
        <div className="pointer-events-none absolute right-2 bottom-2 opacity-20">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <path
              d="M10 70 C 40 10, 80 80, 110 20"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </section>

      {/* Widget 4: Need Help */}
      <section className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-bold text-primary">Need help?</h3>
        <ul className="divide-y divide-gray-100">
          {helpLinks.map((item) => (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-primary/70">
                  {item.icon === "chat" && <MessageCircle size={16} />}
                  {item.icon === "help" && <HelpCircle size={16} />}
                  {item.icon === "phone" && <Phone size={16} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">{item.title}</p>
                  <p className="mt-0.5 truncate text-[10px] text-primary/45">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-primary/30" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default UsageSidebar;
