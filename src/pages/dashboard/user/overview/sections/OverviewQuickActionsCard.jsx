import { CreditCard, Headset, Plus, Smartphone, FileText } from "lucide-react";
import { Link } from "react-router";

const QUICK_ACTION_ICONS = {
  wallet: CreditCard,
  package: Plus,
  plus: Plus,
  sim: Smartphone,
  esim: FileText,
  headset: Headset,
};

export const OverviewQuickActionsCard = ({ quickActions }) => {
  if (!quickActions?.length) return null;

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-xs">
      <h3 className="text-base font-bold tracking-tight text-[#0b1736] sm:text-lg">
        Quick actions
      </h3>

      <div className="mt-3.5 grid grid-cols-3 gap-2.5">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? CreditCard;

          return (
            <Link
              key={id}
              to={path}
              className="group flex h-[68px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-[#fbfcfd] p-1.5 text-center transition-all hover:border-gray-200 hover:bg-white hover:shadow-xs"
            >
              <Icon
                size={18}
                className="text-[#0b1736] transition-transform group-hover:scale-110"
                strokeWidth={1.8}
              />
              <span className="mt-1.5 text-[11px] font-semibold leading-tight text-[#0b1736]/90">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
