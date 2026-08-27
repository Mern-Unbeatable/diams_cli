import { Headset } from "lucide-react";
import { ACTIVATION_TROUBLESHOOTING } from "@/config/activation";

const ActivationTroubleshootingCard = () => {
  return (
    <div className="mt-8 rounded-xl border border-btnPrimary/15 bg-[#eef4fa] px-5 py-5 sm:px-6">
      <p className="font-bold text-primary">{ACTIVATION_TROUBLESHOOTING.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-primary/65">
        {ACTIVATION_TROUBLESHOOTING.description}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <a
          href="#"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-btnPrimary transition-colors hover:bg-gray-50"
        >
          {ACTIVATION_TROUBLESHOOTING.guideLabel}
        </a>
        <a
          href="#"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-btnPrimary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Headset size={16} strokeWidth={1.75} />
          {ACTIVATION_TROUBLESHOOTING.supportLabel}
        </a>
      </div>
    </div>
  );
};

export default ActivationTroubleshootingCard;
