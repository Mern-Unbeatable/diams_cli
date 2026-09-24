import { Cpu, RefreshCw, ShieldCheck } from "lucide-react";

export const EsimPromoCard = ({ onLearnMore }) => {
  return (
    <section
      className="relative overflow-hidden rounded-xl bg-[#0a3fd1] bg-cover bg-right bg-no-repeat p-5 text-white shadow-xl shadow-blue-950/20 sm:p-6"
      style={{ backgroundImage: "url('/esimBG.jpg')" }}
    >

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
    </section>
  );
};
