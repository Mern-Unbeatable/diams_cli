import { Link } from "react-router";
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  Headset,
  HelpCircle,
  MessageCircle,
  Package,
  Smartphone,
  Star,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { USER_OVERVIEW } from "@/config/userOverview";

const QUICK_ACTION_ICONS = {
  wallet: CreditCard,
  package: Package,
  sim: Smartphone,
  headset: Headset,
};

const HELP_ICONS = {
  message: MessageCircle,
  whatsapp: FaWhatsapp,
  help: HelpCircle,
};

const OverviewSidebar = () => {
  const { premium, quickActions, promo, help } = USER_OVERVIEW;

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7ff]">
            <Star size={18} className="text-btnPrimary" fill="currentColor" />
          </span>
          <div>
            <p className="font-bold text-primary">{premium.title}</p>
            <p className="mt-0.5 text-sm text-primary/55">{premium.description}</p>
            <Link
              to={premium.path}
              className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
            >
              {premium.linkLabel}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

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

      <section className="overflow-hidden rounded-2xl bg-linear-to-br from-[#39a1fd] to-[#2b8de8] p-5 text-white">
        <h3 className="text-lg font-bold leading-snug">{promo.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">{promo.description}</p>
        <Link
          to={promo.path}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/30"
        >
          {promo.cta}
          <ArrowRight size={16} />
        </Link>
        <div className="mt-5 flex justify-end">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl">
            🛟
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <h3 className="text-sm font-bold text-primary">Need Help?</h3>
        <ul className="mt-3 divide-y divide-gray-100">
          {help.items.map(({ id, title, description, icon }) => {
            const Icon = HELP_ICONS[icon] ?? HelpCircle;

            return (
              <li key={id}>
                <Link
                  to={help.seeAllPath}
                  className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                    <Icon size={17} className="text-primary/65" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-primary">{title}</p>
                    <p className="text-xs text-primary/55">{description}</p>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-primary/35" />
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to={help.seeAllPath}
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary hover:opacity-80"
        >
          See all support options
          <ArrowRight size={14} />
        </Link>
      </section>
    </aside>
  );
};

export default OverviewSidebar;
