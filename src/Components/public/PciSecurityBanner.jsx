import { ShieldCheck } from "lucide-react";
import { PCI_BANNER } from "@/config/payment";

const PciSecurityBanner = () => {
  return (
    <article className="mt-5 flex flex-col gap-4 rounded-xl border border-btnPrimary/20 bg-[#f0f7ff] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex items-start gap-3">
        <ShieldCheck
          size={22}
          strokeWidth={1.75}
          className="mt-0.5 shrink-0 text-btnPrimary"
        />
        <div>
          <p className="text-sm font-semibold text-primary">{PCI_BANNER.title}</p>
          <p className="mt-1 text-sm text-primary/65">{PCI_BANNER.description}</p>
        </div>
      </div>
      <span className="shrink-0 self-start rounded border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold tracking-wide text-primary/70 sm:self-center">
        {PCI_BANNER.badge}
      </span>
    </article>
  );
};

export default PciSecurityBanner;
