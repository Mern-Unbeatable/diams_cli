import { Cpu, RefreshCw, ShieldCheck } from "lucide-react";

export const EsimPromoCard = ({ onLearnMore }) => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0c2461] via-[#091b49] to-[#040f2d] p-5 sm:p-6 text-white shadow-xl shadow-blue-950/20 border border-blue-900/50">
      {/* Background glow effects */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold leading-snug tracking-tight text-white max-w-[240px]">
            Enjoy the freedom of eSIM.
          </h3>

          {/* Feature List */}
          <div className="mt-5 space-y-4">
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-[#38bdf8] border border-blue-400/20">
                <Cpu size={15} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Instant Activation
                </h4>
                <p className="text-[11px] text-blue-200/70">
                  No physical SIM card
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-[#38bdf8] border border-blue-400/20">
                <RefreshCw size={15} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Switch devices easily
                </h4>
                <p className="text-[11px] text-blue-200/70">
                  Transfer your eSIM in just a few clicks
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-[#38bdf8] border border-blue-400/20">
                <ShieldCheck size={15} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-white">
                  Secure and integrated
                </h4>
                <p className="text-[11px] text-blue-200/70">
                  Next-generation eSIM technology
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-5 py-2 text-xs font-semibold text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Cyber Phone Graphic with Glowing QR on Right Side */}
      <div className="absolute -right-6 top-8 hidden sm:block pointer-events-none opacity-90 lg:opacity-100">
        <div className="relative h-44 w-28 rotate-12 rounded-xl bg-gradient-to-b from-slate-900 to-blue-950 p-2 shadow-2xl border border-cyan-400/40 ring-1 ring-cyan-400/20">
          {/* Glowing QR Screen */}
          <div className="h-full w-full rounded-xl bg-[#001433] p-2 flex flex-col items-center justify-center border border-cyan-500/30">
            {/* Mini glowing neon QR matrix */}
            <div className="relative h-20 w-20 rounded-lg bg-cyan-950/80 p-1 border border-cyan-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)] flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="h-4 w-4 bg-cyan-400 rounded-sm" />
                <div className="h-4 w-4 bg-cyan-400 rounded-sm" />
              </div>
              <div className="flex justify-center items-center">
                <div className="h-3 w-3 bg-cyan-300 rounded-full animate-ping" />
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-4 bg-cyan-400 rounded-sm" />
                <div className="h-2 w-2 bg-cyan-400 rounded-sm self-end" />
              </div>
            </div>
            {/* Tech line */}
            <div className="mt-2 h-1 w-12 rounded-full bg-cyan-400/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
