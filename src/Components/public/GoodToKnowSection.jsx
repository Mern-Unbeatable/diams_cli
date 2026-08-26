import { Clock, Cpu, Lock, Plane } from "lucide-react";
import { GOOD_TO_KNOW } from "@/config/goodToKnow";

const CARD_ICONS = {
  chip: Cpu,
  plane: Plane,
  clock: Clock,
  lock: Lock,
};

const GoodToKnowSection = ({
  title = GOOD_TO_KNOW.title,
  items = GOOD_TO_KNOW.items,
}) => {
  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 sm:px-6 lg:px-10">
        <h2 className="text-xl font-bold text-white lg:text-2xl">{title}</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:gap-5">
          {items.map(({ id, icon, title: cardTitle, description }) => {
            const Icon = CARD_ICONS[icon];

            return (
              <article
                key={id}
                className="rounded-lg border border-btnPrimary/20 bg-secondary p-5 lg:p-6"
              >
                <div className="flex items-start gap-3.5">
                  <Icon
                    size={22}
                    strokeWidth={1.75}
                    className="mt-0.5 shrink-0 text-textsecondary"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white lg:text-base">
                      {cardTitle}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GoodToKnowSection;
