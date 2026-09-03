import { Link } from "react-router";
import { Check } from "lucide-react";
import { BUSINESS_PLANS, BUSINESS_PLANS_SECTION } from "@/config/business";

const BusinessPlansSection = () => {
  const { label, title } = BUSINESS_PLANS_SECTION;

  return (
    <section className="page-section bg-[#f8fafc]">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-btnPrimary sm:text-sm">
            {label}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-8">
          {BUSINESS_PLANS.map(
            ({
              id,
              name,
              tagline,
              price,
              currency,
              period,
              popular,
              features,
              cta,
            }) => (
              <li
                key={id}
                className={`relative flex flex-col rounded-xl border bg-white p-6 shadow-sm sm:p-8 ${
                  popular
                    ? "border-btnPrimary lg:scale-[1.02]"
                    : "border-gray-100"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-4 py-1 text-xs font-bold tracking-wide text-white">
                    Most Popular
                  </span>
                )}

                <header>
                  <h3 className="text-xl font-bold text-primary sm:text-2xl">
                    {name}
                  </h3>
                  <p className="mt-1 text-sm text-primary/60">{tagline}</p>
                </header>

                <div className="mt-6 border-b border-gray-100 pb-6">
                  <div className="flex flex-wrap items-end gap-1">
                    {currency && (
                      <span className="pb-1 text-sm font-medium text-primary/70">
                        {currency}
                      </span>
                    )}
                    <span className="text-4xl font-bold leading-none text-primary sm:text-5xl">
                      {price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-primary/60">{period}</p>
                </div>

                <ul className="mt-6 flex flex-1 flex-col gap-3.5">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={18}
                        strokeWidth={2.5}
                        className="mt-0.5 shrink-0 text-textsecondary"
                      />
                      <span className="text-sm leading-snug text-primary/75">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={cta.path}
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    cta.variant === "solid"
                      ? "bg-btnPrimary text-white"
                      : "border border-btnPrimary text-btnPrimary hover:bg-btnPrimary/5"
                  }`}
                >
                  {cta.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
};

export default BusinessPlansSection;
