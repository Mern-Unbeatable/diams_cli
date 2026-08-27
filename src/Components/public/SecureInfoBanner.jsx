import { Lock, ShieldCheck } from "lucide-react";
import { SECURE_BANNER } from "@/config/verification";

const SecureInfoBanner = () => {
  return (
    <article className="mt-10 flex flex-col gap-4 rounded-xl border border-gray-100 bg-[#f0f6fc] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-btnPrimary/15">
          <Lock size={20} strokeWidth={1.75} className="text-btnPrimary" />
        </div>
        <div>
          <h3 className="text-base font-bold text-primary">{SECURE_BANNER.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-primary/65">
            {SECURE_BANNER.description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 sm:self-center">
        <ShieldCheck size={18} className="text-emerald-600" strokeWidth={1.75} />
        <span className="text-sm font-semibold text-emerald-700">
          {SECURE_BANNER.badge}
        </span>
      </div>
    </article>
  );
};

export default SecureInfoBanner;
