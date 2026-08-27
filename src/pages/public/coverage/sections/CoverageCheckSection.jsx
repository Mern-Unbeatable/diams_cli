import {
  ArrowDown,
  ArrowUp,
  Check,
  Home,
  MapPin,
  Radio,
  Star,
} from "lucide-react";
import { COVERAGE_QUALITY, COVERAGE_SEARCH } from "@/config/coverage";

const METRIC_ICONS = {
  download: ArrowDown,
  upload: ArrowUp,
  home: Home,
  outdoor: Radio,
};

const CoverageCheckSection = () => {
  return (
    <section id="coverage-search" className="page-section bg-white">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.65fr_1fr] lg:gap-6">
          <article className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 lg:p-8">
            <h2 className="text-lg font-bold text-primary sm:text-xl">
              {COVERAGE_SEARCH.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-primary/60">
              {COVERAGE_SEARCH.description}
            </p>

            <form
              className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative min-w-0 flex-1">
                <MapPin
                  size={18}
                  strokeWidth={1.75}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-textsecondary"
                />
                <input
                  type="text"
                  placeholder={COVERAGE_SEARCH.placeholder}
                  className="w-full rounded-lg border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-btnPrimary px-10 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-12"
              >
                {COVERAGE_SEARCH.buttonLabel}
              </button>
            </form>

            <p className="mt-4 text-sm text-primary/60 sm:mt-5">
              <span className="font-bold text-primary">Examples:</span>{" "}
              {COVERAGE_SEARCH.examples.map(({ label, value }, index) => (
                <span key={value}>
                  {index > 0 && " "}
                  <button
                    type="button"
                    className="font-medium text-btnPrimary transition-opacity hover:opacity-80"
                  >
                    {label}
                  </button>
                </span>
              ))}
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-[#d9e8f5] bg-[#eef4fa] p-6 sm:p-7 lg:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                <Check size={15} strokeWidth={3} className="text-white" />
              </span>
              <p className="text-base font-bold text-emerald-600 sm:text-lg">
                {COVERAGE_QUALITY.title}
              </p>
            </div>

            <ul className="mt-6 grid flex-1 grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:mt-7">
              {COVERAGE_QUALITY.metrics.map(({ id, icon, label, value }) => {
                const Icon = METRIC_ICONS[icon];

                return (
                  <li key={id} className="flex flex-col items-center text-center">
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      className="text-textsecondary"
                    />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-primary sm:text-[11px]">
                      {label}
                    </p>
                    {value === "stars" ? (
                      <div className="mt-1.5 flex gap-0.5">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            size={13}
                            strokeWidth={0}
                            className="fill-emerald-500 text-emerald-500"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1.5 text-xs font-semibold text-emerald-600 sm:text-sm">
                        {value}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default CoverageCheckSection;
