import { CreditCard, Headset, Plus, Smartphone, FileText } from "lucide-react";
import { Link } from "react-router";

const QUICK_ACTION_ICONS = {
  wallet: CreditCard,
  plus: Plus,
  sim: Smartphone,
  esim: FileText,
  headset: Headset,
};

export const OverviewQuickActionsCard = ({ quickActions }) => {
  if (!quickActions?.length) return null;

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-bold tracking-tight text-[#0b1736]">
        Quick actions
      </h3>

      <div className="mt-6 grid grid-cols-3 gap-3.5">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? CreditCard;

          return (
            <Link
              key={id}
              to={path}
              className="group flex aspect-square flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-2.5 text-center transition-all hover:border-gray-200 hover:shadow-sm"
            >
              <Icon
                size={22}
                className="text-[#0b1736] transition-transform group-hover:scale-105"
                strokeWidth={1.8}
              />
              <span className="mt-2.5 text-[11px] font-semibold text-[#0b1736]/90 leading-tight">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
