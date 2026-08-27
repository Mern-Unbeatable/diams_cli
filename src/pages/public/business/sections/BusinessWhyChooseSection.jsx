import {
  CreditCard,
  FileText,
  Headset,
  Wifi,
} from "lucide-react";
import { BUSINESS_WHY_CHOOSE } from "@/config/business";

const CARD_ICONS = {
  file: FileText,
  headset: Headset,
  wifi: Wifi,
  card: CreditCard,
};

const BusinessWhyChooseSection = () => {
  const { label, title, cards } = BUSINESS_WHY_CHOOSE;

  return (
    <section className="page-section bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-btnPrimary sm:text-sm">
            {label}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        <ul className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {cards.map(({ id, icon, iconBg, iconColor, title: cardTitle, description }) => {
            const Icon = CARD_ICONS[icon];

            return (
              <li
                key={id}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7"
              >
                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon size={24} strokeWidth={1.75} className={iconColor} />
                </div>

                <h3 className="mt-5 text-center text-lg font-bold text-primary">
                  {cardTitle}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-primary/65">
                  {description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default BusinessWhyChooseSection;
