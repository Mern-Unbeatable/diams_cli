import { Signal } from "lucide-react";
import { COVERAGE_HERO } from "@/config/coverage";

const CoverageHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative min-h-[620px] sm:min-h-[700px] lg:min-h-[760px]">
        <img
          src={COVERAGE_HERO.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent sm:from-white/90 sm:via-white/45 sm:to-transparent"
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] items-center container px-4 py-14 sm:min-h-[700px] sm:px-6 sm:py-16 lg:min-h-[760px] lg:px-10 lg:py-20">
          <div className="w-full">
            <div className="max-w-xl xl:max-w-none">
              <h1 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="block xl:whitespace-nowrap">
                  {COVERAGE_HERO.title}
                </span>
                <span className="block text-btnPrimary">
                  {COVERAGE_HERO.titleAccent}
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-primary/70 sm:text-base lg:text-lg">
                {COVERAGE_HERO.subtitle}
              </p>

              <a
                href={COVERAGE_HERO.cta.path}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-7 sm:py-4 sm:text-base"
              >
                <Signal size={18} strokeWidth={2} className="text-textAccent" />
                {COVERAGE_HERO.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageHeroSection;
