import { Check, Clock, ShieldCheck } from "lucide-react";

export const SecurityLevelCard = ({ securityLevel }) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0c182b] via-[#091526] to-[#040a14] p-5 sm:p-6 text-white shadow-md border border-slate-800 space-y-4">
      {/* Title */}
      <h3 className="text-xs sm:text-sm font-bold text-white/80">
        {securityLevel?.title || "Security level"}
      </h3>

      {/* Cyber Lock Indicator & Headline */}
      <div className="flex items-center gap-3.5 pt-1">
        {/* Glowing Shield Ring */}
        <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full border-2 border-emerald-400 p-1 shadow-[0_0_15px_rgba(52,211,153,0.25)] bg-emerald-950/40">
          <ShieldCheck size={22} className="text-emerald-400" />
        </div>

        <p className="text-xs font-bold text-white leading-snug">
          {securityLevel?.message ||
            "Your account is well protected. Keep it up!"}
        </p>
      </div>

      {/* Checklist */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/80 text-xs">
        {(securityLevel?.checklist || []).map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-white/80">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check size={11} strokeWidth={3} />
            </span>
            <span className="text-[11px] sm:text-xs font-medium">{item}</span>
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[10px] text-white/40">
        <span>Last check: {securityLevel?.lastCheck || "Today, 09:41"}</span>
        <Clock size={12} />
      </div>
    </section>
  );
};
