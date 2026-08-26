import { Link } from "react-router";
import { HERO } from "../../config/hero";

const HeroSection = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={HERO.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[72%_center] sm:object-right"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent sm:from-primary/60 sm:via-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-24 lg:px-10 lg:py-40">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl sm:leading-tight lg:text-7xl">
            {HERO.title}{" "}
            <span className="text-textAccent">{HERO.titleAccent}</span>
          </h1>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white sm:mt-6 sm:max-w-md sm:text-base lg:text-lg">
            {HERO.subtitle}
          </p>

          <div className="mt-6 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              to={HERO.primaryCta.path}
              className="inline-flex items-center justify-center rounded-md bg-btnPrimary px-5 py-2.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:px-6 sm:py-3"
            >
              {HERO.primaryCta.label}
            </Link>

            <Link
              to={HERO.secondaryCta.path}
              className="inline-flex items-center justify-center rounded-md border border-white px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:px-6 sm:py-3"
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
