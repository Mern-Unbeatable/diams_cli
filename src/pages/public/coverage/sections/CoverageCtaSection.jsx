import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { COVERAGE_CTA } from "@/config/coverage";

const CoverageCtaSection = () => {
  const { title, subtitle, button } = COVERAGE_CTA;

  return (
    <section className="page-section bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-[#1a4a8a] via-primary to-[#001028]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgb(57 161 253 / 0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgb(63 208 252 / 0.2) 0%, transparent 40%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 px-6 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-14">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
                {subtitle}
              </p>
            </div>

            <Link
              to={button.path}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-btnPrimary px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-7 sm:py-4 sm:text-base"
            >
              {button.label}
              <ArrowRight size={18} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageCtaSection;
