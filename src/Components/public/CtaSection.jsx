import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/config/cta";

const CtaSection = ({
  title = CTA.title,
  subtitle = CTA.subtitle,
  button = CTA.button,
}) => {
  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 pb-14 sm:px-6 sm:pb-20 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-linear-to-r from-[#1a6fc4] to-[#2b8ed8] px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:gap-10">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm text-textsecondary sm:text-base lg:text-lg">
              {subtitle}
            </p>
          </div>

          <Link
            to={button.path}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-textAccent px-6 py-3 text-sm font-semibold text-primary transition-opacity duration-200 hover:opacity-90 sm:px-8 sm:py-3.5 sm:text-base"
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
