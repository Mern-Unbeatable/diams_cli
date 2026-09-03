import { RefreshCw, Star, Zap } from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const WHY_UPGRADE_ICONS = {
  zap: Zap,
  star: Star,
  refresh: RefreshCw,
};

export const WhyUpgradeWidget = () => {
  const { whyUpgrade } = USER_PLANS_OPTIONS;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h3 className="text-base font-bold text-primary">Why upgrade?</h3>
      <ul className="mt-4 space-y-4">
        {whyUpgrade.map((item) => {
          const Icon = WHY_UPGRADE_ICONS[item.icon] ?? Zap;

          return (
            <li key={item.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef7ff] text-btnPrimary">
                <Icon size={16} />
              </span>
              <div>
                <h4 className="text-xs font-bold text-primary">{item.title}</h4>
                <p className="mt-0.5 text-[11px] leading-normal text-primary/55">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default WhyUpgradeWidget;
