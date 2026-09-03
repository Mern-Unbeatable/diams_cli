import { useState } from "react";
import { Check, Copy, Cpu, ShieldCheck } from "lucide-react";

export const EsimActiveCard = ({ esimData }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = () => {
    if (esimData?.number) {
      navigator.clipboard?.writeText(esimData.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Column: Icon & Line Details */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Blue Chip Icon */}
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#3ba7ff] to-[#1e88e5] text-white shadow-md shadow-blue-500/20">
            <Cpu className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.75} />
            <span className="mt-0.5 text-[11px] sm:text-xs font-bold tracking-tight">
              eSIM
            </span>
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h3 className="text-base sm:text-lg font-bold text-primary">
                {esimData.title || "eSIM active"}
              </h3>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200/60">
                {esimData.status || "Enabled"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-primary/90">
                {esimData.planName || "NovaSky Plus"}
              </span>
              <span className="rounded bg-[#1d4ed8] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {esimData.networkBadge || "5G"}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-0.5 text-xs text-primary/60">
              <span>Number</span>
              <span className="font-bold text-primary">
                {esimData.number || "+41 76 123 45 67"}
              </span>
              <button
                type="button"
                onClick={handleCopyNumber}
                className="relative inline-flex items-center text-primary/40 hover:text-btnPrimary transition-colors"
                title="Copy phone number"
                aria-label="Copy phone number"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-600" />
                ) : (
                  <Copy size={14} />
                )}
                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-white shadow">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column: Last used & Activated date */}
        <div className="flex flex-row lg:flex-col gap-6 sm:gap-8 lg:gap-3 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8 text-xs">
          <div>
            <p className="text-primary/50 text-[11px] font-medium">Last Used</p>
            <p className="font-bold text-primary mt-0.5 text-sm">
              {esimData.lastUsed || "Today, 09:41"}
            </p>
          </div>
          <div>
            <p className="text-primary/50 text-[11px] font-medium">
              Activated on
            </p>
            <p className="font-bold text-primary mt-0.5 text-sm">
              {esimData.activatedOn || "August 7, 2024"}
            </p>
          </div>
        </div>

        {/* Right Graphic: Smartphone with NovaSky and Cyber Shield */}
        <div className="relative hidden md:flex items-center justify-center lg:pr-2">
          {/* Concentric Signal Rings */}
          <div className="relative flex items-center justify-center">
            <div className="absolute h-36 w-36 rounded-full border border-sky-200/50 animate-pulse pointer-events-none" />
            <div className="absolute h-28 w-28 rounded-full border border-sky-100 pointer-events-none" />

            {/* Smartphone Vector Illustration */}
            <div className="relative z-10 flex h-28 w-16 -rotate-6 flex-col items-center justify-between rounded-xl bg-gradient-to-br from-[#0c182b] via-[#132847] to-[#0a1524] p-1.5 shadow-xl border-2 border-slate-700/60 ring-1 ring-white/20">
              {/* Dynamic Island / Speaker */}
              <div className="h-1 w-4 rounded-full bg-slate-800" />

              {/* Screen Content */}
              <div className="flex flex-1 flex-col items-center justify-center">
                <div className="flex items-center gap-0.5 text-[7px] font-extrabold tracking-widest text-[#38bdf8]">
                  <span>NOVA</span>
                  <span className="text-white">SKY</span>
                </div>
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Home bar */}
              <div className="h-0.5 w-6 rounded-full bg-slate-600" />
            </div>

            {/* Cyan Floating Shield */}
            <div className="relative -ml-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0284c7] text-white shadow-lg shadow-sky-500/30 ring-4 ring-white">
              <ShieldCheck className="h-7 w-7" strokeWidth={2.2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
