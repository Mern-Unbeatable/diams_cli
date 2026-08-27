import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_HERO, BUSINESS_HERO_FEATURES } from "@/config/business";

const FEATURE_ICONS = {
  building: Building2,
  shield: ShieldCheck,
  phone: Phone,
  chart: BarChart3,
};

const BusinessFeatureBar = () => {
  return (
    <div className="business-feature-bar overflow-hidden rounded-xl bg-secondary sm:rounded-2xl">
      <ul className="grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {BUSINESS_HERO_FEATURES.map(({ id, icon, title, description }) => {
          const Icon = FEATURE_ICONS[icon];

          return (
            <li
              key={id}
              className="flex items-start gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-6 lg:px-8 lg:py-7"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary sm:h-12 sm:w-12 sm:rounded-xl">
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className="text-textsecondary"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs sm:tracking-[0.12em]">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-snug text-white/65 sm:mt-1.5 sm:text-sm">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const BusinessHeroSection = () => {
  return (
    <section className="bg-white">
      <div className="relative min-h-[620px] sm:min-h-[700px] lg:min-h-[760px]">
        <div className="absolute inset-0 overflow-hidden bg-primary">
          <img
            src={BUSINESS_HERO.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center sm:object-[65%_center] lg:object-right"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-primary/90 via-primary/85 to-primary/95 sm:bg-linear-to-r sm:from-primary/95 sm:via-primary/80 sm:to-primary/25 lg:from-primary/92 lg:via-primary/60 lg:to-transparent"
          />

          <div aria-hidden="true" className="hero-haze-overlay" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[620px] items-center container px-4 py-14 sm:min-h-[700px] sm:px-6 sm:py-16 lg:min-h-[760px] lg:px-10 lg:py-20">
          <div className="max-w-xl xl:max-w-none">
            <p className="text-sm font-semibold tracking-wide text-textAccent">
              {BUSINESS_HERO.label}
            </p>

            <h1 className="mt-3 text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              <span className="block xl:whitespace-nowrap">{BUSINESS_HERO.title}</span>
              <span className="block text-textAccent">{BUSINESS_HERO.titleAccent}</span>
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 sm:mt-5 sm:max-w-lg sm:text-base lg:text-lg">
              {BUSINESS_HERO.subtitle}
            </p>

            <Link
              to={BUSINESS_HERO.cta.path}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:mt-8 sm:w-auto sm:px-7 sm:py-3.5 sm:text-base"
            >
              {BUSINESS_HERO.cta.label}
              <ArrowRight size={18} strokeWidth={2.25} />
            </Link>
          </div>
        </div>

        <div className="relative z-20 -mt-2 mx-auto container px-4 pb-2 sm:absolute sm:inset-x-0 sm:bottom-0 sm:mt-0 sm:translate-y-1/2 sm:px-6 sm:pb-0 lg:px-10">
          <BusinessFeatureBar />
        </div>
      </div>

      <div className="hidden h-24 sm:block lg:h-28" aria-hidden="true" />
    </section>
  );
};

export default BusinessHeroSection;
