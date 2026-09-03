import { Link } from "react-router";
import { Globe, Phone, Voicemail } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageActiveOptionsWidget = () => {
  const { activeOptions } = USER_USAGE;

  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
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
          <li
            key={opt.id}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2.5 text-primary/80">
              {opt.icon === "globe" && (
                <Globe size={15} className="text-primary/45" />
              )}
              {opt.icon === "phone" && (
                <Phone size={15} className="text-primary/45" />
              )}
              {opt.icon === "voicemail" && (
                <Voicemail size={15} className="text-primary/45" />
              )}
              <span className="font-semibold">{opt.name}</span>
            </div>
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              {opt.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsageActiveOptionsWidget;
