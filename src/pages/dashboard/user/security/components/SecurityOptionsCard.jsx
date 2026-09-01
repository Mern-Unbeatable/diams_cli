import {
  Bell,
  Check,
  ChevronRight,
  Key,
  Laptop,
  Lock,
  Mail,
  Phone,
  Shield,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export const SecurityOptionsCard = ({
  banner,
  settings,
  onItemClick,
}) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "shield":
        return <ShieldCheck size={16} />;
      case "key":
        return <Key size={16} />;
      case "mail":
        return <Mail size={16} />;
      case "phone":
        return <Phone size={16} />;
      case "monitor":
        return <Laptop size={16} />;
      case "bell":
        return <Bell size={16} />;
      case "trash":
        return <Trash2 size={16} />;
      default:
        return <Shield size={16} />;
    }
  };

  const getBadgeClass = (variant) => {
    switch (variant) {
      case "green":
        return "bg-emerald-50 text-emerald-600 border-emerald-200/50";
      case "blue":
        return "bg-sky-50 text-btnPrimary border-sky-100";
      case "red":
        return "bg-rose-50 text-rose-500 border-rose-100";
      default:
        return "bg-gray-50 text-primary/70 border-gray-200";
    }
  };

  const getIconBoxClass = (variant) => {
    if (variant === "red") {
      return "bg-rose-50 text-rose-500 border-rose-100/70";
    }
    return "bg-sky-50 text-[#0284c7] border-sky-100/70";
  };

  return (
    <section className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-6">
      {/* Top Banner Area */}
      <div className="flex items-center justify-between gap-4 pb-1">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-primary">
            {banner?.title || "Strengthen your account security."}
          </h3>
          <p className="text-xs sm:text-sm text-primary/60">
            {banner?.subtitle ||
              "We recommend enabling all available security options."}
          </p>
        </div>

        {/* Cyber Shield Icon with Green Badge */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#3ba7ff] to-[#0284c7] text-white shadow-md shadow-sky-500/20">
            <Lock size={20} className="sm:h-6 sm:w-6" />
          </div>
          {/* Green Check Badge */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 border-2 border-white text-[10px] font-bold text-white shadow-xs">
            <Check size={11} strokeWidth={3} />
          </span>
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Security Settings List */}
      <div className="divide-y divide-gray-100">
        {(settings || []).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemClick?.(item.id)}
            className="flex w-full items-center justify-between py-3.5 first:pt-0 last:pb-0 text-left transition-colors hover:bg-gray-50/60 -mx-2 px-2 rounded-xl group cursor-pointer"
          >
            {/* Left: Icon & Text */}
            <div className="flex items-start gap-3.5 min-w-0 pr-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${getIconBoxClass(
                  item.statusVariant
                )} transition-transform group-hover:scale-105`}
              >
                {getIcon(item.icon)}
              </span>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-primary group-hover:text-btnPrimary transition-colors truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-primary/50 mt-0.5 leading-normal">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Right: Badge & Extra Info */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${getBadgeClass(
                    item.statusVariant
                  )}`}
                >
                  {item.status}
                </span>
                {item.extraInfo && (
                  <p className="text-[10px] text-primary/45 font-medium mt-0.5 truncate max-w-[130px] sm:max-w-none">
                    {item.extraInfo}
                  </p>
                )}
              </div>
              <ChevronRight
                size={15}
                className="text-primary/30 group-hover:text-btnPrimary group-hover:translate-x-0.5 transition-all"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
