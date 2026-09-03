import { Link } from "react-router";
import {
  ArrowRight,
  CreditCard,
  Globe,
  ShieldCheck,
  Signal,
  Smartphone,
  Layers,
} from "lucide-react";
import { HELP_CATEGORIES } from "@/config/help";

const CATEGORY_ICONS = {
  billing: CreditCard,
  esim: Smartphone,
  coverage: Signal,
  plans: Layers,
  roaming: Globe,
  account: ShieldCheck,
};

const HelpCategoriesSection = () => {
  const { title, items } = HELP_CATEGORIES;

  return (
    <section className="page-section bg-[#f8fafc]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <h2 className="text-2xl font-bold text-primary sm:text-3xl">{title}</h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-5">
          {items.map(({ id, icon, title: cardTitle, description }) => {
            const Icon = CATEGORY_ICONS[icon];

            return (
              <li key={id}>
                <Link
                  to="/help"
                  className="group flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
                >
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-textsecondary"
                  />
                  <h3 className="mt-4 text-base font-bold text-primary">
                    {cardTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-primary/60">
                    {description}
                  </p>
                  <ArrowRight
                    size={18}
                    className="mt-5 text-textsecondary transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default HelpCategoriesSection;
