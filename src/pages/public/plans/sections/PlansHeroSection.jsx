import { CheckCircle2, Globe, Headset } from "lucide-react";
import { PLANS_PAGE_HERO } from "@/config/plansPage";

const HIGHLIGHT_ICONS = {
  globe: Globe,
  check: CheckCircle2,
  headset: Headset,
};

const PlansHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary">
      <img
        src={PLANS_PAGE_HERO.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div aria-hidden="true" className="hero-haze-overlay" />

      <div className="relative z-10 mx-auto container px-5 py-16 text-center sm:px-6 sm:py-24 lg:px-10 lg:py-32">
        <h1 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          {PLANS_PAGE_HERO.title}{" "}
          <span className="text-textAccent">{PLANS_PAGE_HERO.titleAccent}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white sm:text-base lg:text-lg">
          {PLANS_PAGE_HERO.subtitle}
        </p>

        <ul className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-10 lg:gap-14">
          {PLANS_PAGE_HERO.highlights.map(({ id, icon, label }) => {
            const Icon = HIGHLIGHT_ICONS[icon];
            return (
              <li key={id} className="flex items-center gap-2.5">
                <Icon size={20} className="text-textAccent" strokeWidth={2} />
                <span className="text-sm font-medium text-white sm:text-base">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default PlansHeroSection;
