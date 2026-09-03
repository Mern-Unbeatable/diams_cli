import { Smartphone } from "lucide-react";
import { COMPATIBLE_DEVICES } from "@/config/activation";

const CompatibleDevicesCard = () => {
  return (
    <article className="rounded-xl border border-gray-100 bg-[#f0f6fc] px-5 py-6 sm:px-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-btnPrimary/15">
          <Smartphone
            size={20}
            strokeWidth={1.75}
            className="text-btnPrimary"
          />
        </div>
        <div>
          <h3 className="text-base font-bold text-primary">
            {COMPATIBLE_DEVICES.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-primary/65">
            {COMPATIBLE_DEVICES.description}
          </p>
          <a
            href="#"
            className="mt-3 inline-block text-sm font-medium text-btnPrimary hover:underline"
          >
            {COMPATIBLE_DEVICES.linkLabel}
          </a>
        </div>
      </div>
    </article>
  );
};

export default CompatibleDevicesCard;
