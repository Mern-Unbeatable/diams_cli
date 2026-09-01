import { CreditCard, Headset, Package, Smartphone } from "lucide-react";
import { Link } from "react-router";

const QUICK_ACTION_ICONS = {
  wallet: CreditCard,
  package: Package,
  sim: Smartphone,
  headset: Headset,
};

export const OverviewQuickActionsCard = ({ quickActions }) => {
  if (!quickActions?.length) return null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
      <h3 className="text-sm font-bold text-primary">Quick Actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {quickActions.map(({ id, label, icon, path }) => {
          const Icon = QUICK_ACTION_ICONS[icon] ?? Package;

          return (
            <Link
              key={id}
              to={path}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-gray-50/80 px-2 py-4 text-center transition-colors hover:bg-gray-100"
            >
              <Icon size={20} className="text-primary/70" strokeWidth={1.6} />
              <span className="text-xs font-medium text-primary/75">{label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
