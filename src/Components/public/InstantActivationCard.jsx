import { Zap } from "lucide-react";
import { INSTANT_ACTIVATION } from "@/config/payment";

const InstantActivationCard = () => {
  return (
    <article className="rounded-2xl border border-btnPrimary/15 bg-[#f0f7ff] px-5 py-5 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-btnPrimary/15">
          <Zap size={20} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-primary">
            {INSTANT_ACTIVATION.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-primary/65">
            {INSTANT_ACTIVATION.description}
          </p>
        </div>
      </div>
    </article>
  );
};

export default InstantActivationCard;
