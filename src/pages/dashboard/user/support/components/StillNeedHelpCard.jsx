import { Headset, MessageSquare } from "lucide-react";

export const StillNeedHelpCard = ({ onStartChat }) => {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0c1a30] via-[#091527] to-[#040a14] p-5 text-white shadow-md border border-slate-800 space-y-3">
      {/* Background Watermark */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 text-white/5">
        <Headset size={90} />
      </div>

      <div className="relative z-10 space-y-1">
        <h4 className="text-xs sm:text-sm font-bold text-white">
          Still need help?
        </h4>
        <p className="text-[11px] text-white/65 leading-normal">
          Our support team is ready to assist you 24/7.
        </p>
      </div>

      <div className="relative z-10 pt-1">
        <button
          type="button"
          onClick={onStartChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-btnPrimary py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90 active:scale-[0.99]"
        >
          <MessageSquare size={14} />
          <span>Start Live Chat</span>
        </button>
      </div>
    </section>
  );
};
