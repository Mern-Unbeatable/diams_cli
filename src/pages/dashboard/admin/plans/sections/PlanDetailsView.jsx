import { useState } from "react";
import {
  ArrowLeft,
  ChevronDown,
  Radio,
  Phone,
  MessageSquare,
  Wifi,
  Globe,
  ShieldCheck,
  Check,
  Headphones,
  Cpu,
  Plane,
  Clock,
  Lock,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Can I change my plan anytime?",
    answer:
      "Yes, you can upgrade, downgrade or switch between plans at any time directly from your account dashboard with zero penalty.",
  },
  {
    question: "Is there a commitment or hidden fees?",
    answer:
      "No, all NovaSky plans are completely flexible with no minimum commitment contract and absolutely no hidden activation or cancellation fees.",
  },
  {
    question: "Can I use my plan while traveling in the EU?",
    answer:
      "Yes! Roaming across all EU countries is fully included. You can use your included high-speed data, make unlimited calls and send unlimited SMS without extra roaming charges.",
  },
  {
    question: "Can I use my plan while traveling outside the EU?",
    answer:
      "Worldwide roaming add-ons can be purchased instantly with just one click to keep you connected in over 180 countries around the globe.",
  },
  {
    question: "What happens if I use all my data?",
    answer:
      "Once your high-speed allowance is reached, you can continue browsing at standard speed with no surprise overage charges, or top up additional high-speed 5G data instantly.",
  },
];

const PlanDetailsView = ({ plan, onBack }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  if (!plan) return null;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const planName = plan.name || "Plus";
  const brandName = plan.brand || "NovaSky";
  const price = plan.price || "39.90";
  const currency = plan.currency || "CHF";
  const period = plan.period || "/month";

  return (
    <div className="space-y-8 pb-10 text-slate-900">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 transition-colors hover:text-sky-600"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Plans</span>
      </button>

      {/* 1. Top Hero / Plan Summary Banner */}
      <div className="rounded-xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          {/* Left: 3D eSIM Visual Card */}
          <div className="relative col-span-12 flex h-55 flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br from-[#0c1f38] via-[#091a30] to-[#040e1c] p-6 text-white shadow-xl lg:col-span-3">
            {/* Glowing Accent Ring */}
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sky-500/20 blur-2xl" />
            <div className="absolute -left-10 -bottom-10 h-36 w-36 rounded-full bg-blue-600/20 blur-xl" />

            <div className="relative z-10">
              <span className="text-xs font-semibold text-slate-300">
                {brandName}
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#38bdf8]">
                {planName}
              </h3>
            </div>

            {/* Golden Chip Graphic */}
            <div className="relative z-10 my-auto h-8 w-11 rounded-md bg-linear-to-tr from-amber-300 via-yellow-200 to-amber-400 p-1.5 shadow-md">
              <div className="h-full w-full rounded-xs border border-amber-600/30 grid grid-cols-2 gap-0.5 opacity-80" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-mono text-base font-bold tracking-wider text-white">
                5G
              </span>
            </div>
          </div>

          {/* Middle: Plan Intro & Key Highlights */}
          <div className="col-span-12 space-y-4 lg:col-span-6 lg:px-4">
            <span className="inline-block rounded-full bg-[#38bdf8] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
              POPULAR
            </span>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {brandName} <span className="text-[#38bdf8]">{planName}</span>
              </h1>
              <p className="mt-1 text-xs font-semibold text-slate-800 sm:text-sm">
                {plan.tagline || "The perfect balance for your everyday life."}
              </p>
              <p className="mt-1 text-xs text-slate-500 sm:text-[13px]">
                Enjoy a connected life with unlimited calls and SMS, and stay
                connected across Switzerland and the EU.
              </p>
            </div>

            {/* 4 Mini Highlight Pills */}
            <div className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-4">
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-700">
                <Radio className="h-3.5 w-3.5 text-sky-500" />
                <span>5G Ultra-fast</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />
                <span>Reliable Swiss</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-700">
                <Globe className="h-3.5 w-3.5 text-sky-500" />
                <span>Roaming in EU</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-2 text-[11px] font-medium text-slate-700">
                <Headphones className="h-3.5 w-3.5 text-sky-500" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right: Monthly Price Card */}
          <div className="col-span-12 flex h-55 flex-col justify-center rounded-xl bg-[#0c1f38] p-6 text-white shadow-xl lg:col-span-3">
            <span className="text-xs font-medium text-slate-300">
              Monthly Price
            </span>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xs font-medium text-slate-300">
                {currency}
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {price}
              </span>
              <span className="text-xs text-slate-300 sm:text-sm">
                {period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Two Cards: What's included & Plan summary */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        {/* Left Card: What's included */}
        <div className="flex flex-col justify-between rounded-xl bg-[#0e213b] p-7 text-white shadow-xl sm:p-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              What&apos;s included
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
              {/* Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Radio className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">80 GB in 5G</h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    High-speed data in Switzerland & EU
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Roaming in EU Included
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Use your data, calls and SMS across the EU
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Unlimited Calls
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Unlimited calls within Switzerland and EU
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    No commitment
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    No contract. Cancel anytime you want.
                  </p>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Unlimited SMS
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Unlimited SMS within Switzerland and EU
                  </p>
                </div>
              </div>

              {/* Item 6 */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Wifi className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Hotspot Included
                  </h4>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Share your connection wherever you go
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Plan summary */}
        <div className="flex flex-col justify-between rounded-xl bg-[#0e213b] p-7 text-white shadow-xl sm:p-8">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Plan summary
            </h2>

            <div className="mt-6 divide-y divide-slate-700/50 text-xs sm:text-[13px]">
              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Radio className="h-3.5 w-3.5 text-sky-400" />
                  Data
                </span>
                <span className="font-semibold text-white">80 GB in 5G</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Phone className="h-3.5 w-3.5 text-sky-400" />
                  Calls
                </span>
                <span className="font-semibold text-white">Unlimited</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <MessageSquare className="h-3.5 w-3.5 text-sky-400" />
                  SMS
                </span>
                <span className="font-semibold text-white">Unlimited</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Globe className="h-3.5 w-3.5 text-sky-400" />
                  Roaming
                </span>
                <span className="font-semibold text-white">EU Included</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Wifi className="h-3.5 w-3.5 text-sky-400" />
                  Hotspot
                </span>
                <span className="font-semibold text-white">Included</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Radio className="h-3.5 w-3.5 text-sky-400" />
                  5G Access
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                  <Check className="h-3 w-3" />
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Cpu className="h-3.5 w-3.5 text-sky-400" />
                  eSIM
                </span>
                <span className="font-semibold text-white">Included</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="flex items-center gap-2.5 text-slate-300">
                  <Check className="h-3.5 w-3.5 text-sky-400" />
                  Contract
                </span>
                <span className="font-semibold text-white">No Commitment</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700/60 pt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-semibold text-slate-300">
                {currency}
              </span>
              <span className="text-3xl font-extrabold tracking-tight text-white">
                {price}
              </span>
              <span className="text-xs font-medium text-slate-300">
                {period}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section: Good to know */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Good to know
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3.5 rounded-xl bg-[#0e213b] p-4 text-white shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm">eSIM Ready</h4>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Activate your plan instantly with eSIM.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl bg-[#0e213b] p-4 text-white shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm">Travel with ease</h4>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Roam worry-free in the EU with your plan.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl bg-[#0e213b] p-4 text-white shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm">
                Instant activation
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Get connected in minutes after your order.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-xl bg-[#0e213b] p-4 text-white shadow-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold sm:text-sm">
                Secure & reliable
              </h4>
              <p className="mt-0.5 text-[11px] text-slate-300">
                Your data and privacy are our priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Section: Frequently Asked Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/50"
                >
                  <span className="text-xs font-bold text-slate-900 sm:text-sm">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-sky-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-slate-50/40 px-4 py-3.5 text-xs text-slate-600 sm:px-5 sm:text-[13px] leading-relaxed animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsView;
