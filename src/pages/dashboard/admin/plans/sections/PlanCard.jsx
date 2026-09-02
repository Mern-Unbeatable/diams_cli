import {
  Radio,
  Phone,
  MessageSquare,
  Wifi,
  Globe,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const getFeatureIcon = (iconName) => {
  switch (iconName) {
    case "radio":
      return <Radio className="h-4 w-4 shrink-0 text-sky-400" />;
    case "phone":
      return <Phone className="h-4 w-4 shrink-0 text-sky-400" />;
    case "message":
      return <MessageSquare className="h-4 w-4 shrink-0 text-sky-400" />;
    case "wifi":
      return <Wifi className="h-4 w-4 shrink-0 text-sky-400" />;
    case "globe":
      return <Globe className="h-4 w-4 shrink-0 text-sky-400" />;
    case "shield":
      return <ShieldCheck className="h-4 w-4 shrink-0 text-sky-400" />;
    case "check":
    default:
      return <CheckCircle2 className="h-4 w-4 shrink-0 text-sky-400" />;
  }
};

const PlanCard = ({ plan, onEdit, onDelete, onMoreDetails }) => {
  const isFeatured = Boolean(plan.isFeatured);

  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl bg-[#0e213b] text-white shadow-xl transition-all duration-200 hover:shadow-2xl ${
        isFeatured
          ? "p-8 sm:p-9 lg:py-12 lg:-my-5 z-10 ring-1 ring-sky-500/20 shadow-2xl"
          : "p-7 sm:p-8"
      }`}
    >
      <div>
        {/* Plan Title */}
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">
          {plan.brand || "NovaSky"}{" "}
          <span className="text-[#38bdf8]">{plan.name}</span>
        </h2>

        {/* Plan Tagline / Subtitle */}
        <p className="mt-2 min-h-[38px] text-xs text-slate-300 sm:text-[13px]">
          {plan.tagline}
        </p>

        {/* Pricing Block */}
        <div className="mt-6 flex items-baseline gap-1.5 pb-6">
          <span className="text-sm font-semibold text-slate-300">
            {plan.currency || "CHF"}
          </span>
          <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {plan.price}
          </span>
          <span className="text-xs font-medium text-slate-300 sm:text-sm">
            {plan.period || "/month"}
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3.5 border-t border-slate-700/60 pt-6">
          {plan.features?.map((feature, idx) => (
            <div key={feature.id || idx} className="flex items-center gap-3">
              {getFeatureIcon(feature.icon)}
              <span className="text-xs font-normal text-slate-200 sm:text-[13px]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions Section */}
      <div className={`space-y-4 pt-2 ${isFeatured ? "mt-10" : "mt-8"}`}>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onEdit && onEdit(plan)}
            className="flex-1 rounded-xl bg-[#38bdf8] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-sky-500 active:scale-95 sm:text-sm text-center"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete && onDelete(plan)}
            className="flex-1 rounded-xl bg-[#ff4b4b] py-2.5 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-600 active:scale-95 sm:text-sm text-center"
          >
            Delete
          </button>
        </div>

        {/* More Details link */}
        <button
          type="button"
          onClick={() => onMoreDetails && onMoreDetails(plan)}
          className="block w-full text-center text-xs text-slate-300 transition-colors hover:text-white"
        >
          More details &gt;
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
