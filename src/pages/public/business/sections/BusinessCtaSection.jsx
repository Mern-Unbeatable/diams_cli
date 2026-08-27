import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { BUSINESS_CTA } from "@/config/business";

const BusinessCtaSection = () => {
  const { image, title, subtitle, button } = BUSINESS_CTA;

  return (
    <div className="page-section">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="relative min-h-60 overflow-hidden rounded-2xl sm:min-h-70 lg:min-h-75">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-right"
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-primary/92 from-0% via-primary/55 via-42% to-primary/5 to-72% sm:via-primary/45 sm:to-transparent"
          />

          <div className="relative z-10 flex h-full min-h-60 flex-col items-start justify-center gap-6 px-6 py-10 sm:min-h-70 sm:px-10 sm:py-12 lg:min-h-75 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-12 lg:py-14">
            <div className="max-w-xl lg:max-w-2xl">
              <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight xl:text-4xl">
                <span className="block xl:whitespace-nowrap">
                  Ready to connect your business
                </span>
                <span className="block xl:whitespace-nowrap">
                  with Switzerland&apos;s new network?
                </span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/90 sm:text-base">
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
    </div>
  );
};

export default BusinessCtaSection;
