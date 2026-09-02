import {
  Radio,
  Phone,
  MessageSquare,
  Wifi,
  CheckCircle2,
  Globe,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const PLANS = [
  {
    id: "NovaSky One",
    prefix: "NovaSky",
    accent: "One",
    subtitle: "Everything you need for everyday use",
    price: "24.90",
    popular: false,
    features: [
      { text: "25 GB in 5G Switzerland", icon: Radio },
      { text: "Unlimited Calls within Switzerland", icon: Phone },
      { text: "Unlimited SMS within Switzerland", icon: MessageSquare },
      { text: "Hotspot included", icon: Wifi },
      { text: "No commitment", icon: CheckCircle2 },
    ],
  },
  {
    id: "NovaSky Plus",
    prefix: "NovaSky",
    accent: "Plus",
    subtitle: "The perfect balance for your everyday life",
    price: "39.90",
    popular: true,
    features: [
      { text: "80 GB in 5G Switzerland & EU", icon: Radio },
      { text: "Unlimited Calls within Switzerland", icon: Phone },
      { text: "Unlimited SMS within Switzerland & EU", icon: MessageSquare },
      { text: "Hotspot included", icon: Wifi },
      { text: "Roaming in EU included", icon: Globe },
      { text: "No commitment", icon: CheckCircle2 },
    ],
  },
  {
    id: "NovaSky Max",
    prefix: "NovaSky",
    accent: "Max",
    subtitle: "For those who want the maximum",
    price: "59.90",
    popular: false,
    features: [
      { text: "150 GB in 5G Switzerland", icon: Radio },
      { text: "Unlimited Calls within Switzerland", icon: Phone },
      { text: "Unlimited SMS within Switzerland & EU", icon: MessageSquare },
      { text: "Roaming worldwide included", icon: Globe },
      { text: "Priority Network", icon: ShieldCheck },
    ],
  },
];

const StepPlanSelection = ({ formData, onChange, onNext, onPrev }) => {
  const selectedPlan = formData.plan || "NovaSky Plus";

  const handleSelectPlan = (planId) => {
    onChange("plan", planId);
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* 3 Dark Navy Plan Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl bg-[#0b1b3d] p-7 sm:p-8 text-white shadow-xl transition-all ${
                isSelected
                  ? "ring-4 ring-[#0080ff] shadow-[0_10px_30px_rgba(0,128,255,0.25)]"
                  : "hover:scale-[1.01]"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0080ff] px-4 py-1 text-[11px] font-bold tracking-wider text-white uppercase shadow-md">
                  POPULAR
                </span>
              )}

              {/* Plan Title & Subtitle */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {plan.prefix} <span className="text-sky-400">{plan.accent}</span>
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-sm font-semibold text-slate-300">
                    CHF
                  </span>
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-slate-300">
                    /month
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3.5 text-xs sm:text-[13px] text-slate-200">
                  {plan.features.map((feat, fIdx) => {
                    const Icon = feat.icon;
                    return (
                      <li key={fIdx} className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-sky-400 shrink-0" />
                        <span>{feat.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 cursor-pointer ${
                    isSelected
                      ? "bg-[#0080ff] text-white hover:bg-blue-600"
                      : "bg-[#0080ff] text-white hover:bg-blue-600"
                  }`}
                >
                  Choose One
                </button>

                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-300 hover:text-white cursor-pointer transition-colors">
                  <span>More details</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Back Navigation Button */}
      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 cursor-pointer"
        >
          &lt; Back
        </button>
      </div>
    </div>
  );
};

export default StepPlanSelection;
