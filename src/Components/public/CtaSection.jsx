import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/config/cta";

const CtaSection = ({
  title = CTA.title,
  titleAccent = CTA.titleAccent,
  subtitle = CTA.subtitle,
  button = CTA.button,
}) => {
  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 pb-14 sm:px-6 sm:pb-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-btnPrimary/25 bg-linear-to-r from-[#2b9fe8]/40 via-[#0f4a8a]/40 to-primary/40 px-8 py-10 sm:px-10 sm:py-12 lg:flex-row lg:items-center lg:gap-12 lg:px-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {title}{" "}
              <span className="text-textAccent">{titleAccent}</span>
            </h2>
            <p className="mt-3 text-sm text-white sm:text-base lg:text-lg">
              {subtitle}
            </p>
          </div>

          <Link
            to={button.path}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-base"
          >
            {button.label}
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
