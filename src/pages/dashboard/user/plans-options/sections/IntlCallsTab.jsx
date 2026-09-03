import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  HelpCircle,
  Package,
  Phone,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

export const IntlHeroBanner = () => {
  const { banner } = USER_PLANS_OPTIONS.intlCalls;

  return (
    <section className="space-y-4 rounded-xl bg-[#0f172a] p-6 text-white shadow-lg shadow-slate-900/10 sm:p-7">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
        <Globe size={14} className="shrink-0 text-sky-400" />
        <span>{banner.tag}</span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          {banner.title}
        </h3>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/70">
          {banner.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-6 border-t border-white/10 pt-4 text-sm font-medium text-white/80">
        {banner.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export const IntlActivePackageCard = () => {
  const { activePackage } = USER_PLANS_OPTIONS.intlCalls;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
            <Package size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-base font-bold text-primary">
                Your Active Packages
              </h3>
              <span className="rounded-full bg-btnPrimary/10 px-2.5 py-0.5 text-xs font-bold text-btnPrimary">
                1 ACTIVE
              </span>
            </div>
            <p className="text-xs text-primary/60 sm:text-sm">
              Your currently active international calling add-ons
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <Phone size={18} className="text-btnPrimary" />
            <h4 className="text-base font-bold text-primary sm:text-lg">
              {activePackage.title}
            </h4>
          </div>
          <span className="rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-bold text-btnPrimary">
            CHF {activePackage.price}
          </span>
        </div>

        <p className="text-sm text-primary/60">
          Expires on:{" "}
          <span className="font-semibold text-primary">
            {activePackage.expiresOn}
          </span>
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-primary/70">
              Remaining Talk Time:
            </span>
            <span className="font-bold text-btnPrimary">
              {activePackage.usedText}
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[75%] rounded-full bg-btnPrimary" />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-sm">
          <span className="flex items-center gap-1.5 font-semibold text-primary/70">
            <RefreshCw size={15} className="text-emerald-600" />
            Auto-renew: <span className="font-bold text-emerald-600">ON</span>
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 font-semibold text-red-600 transition-colors hover:underline"
          >
            <Trash2 size={15} />
            <span>Remove</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export const IntlAvailablePackagesGrid = () => {
  const { packages } = USER_PLANS_OPTIONS.intlCalls;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
          <Phone size={20} />
        </span>
        <div>
          <h3 className="text-base font-bold text-primary sm:text-lg">
            Available Packages
          </h3>
          <p className="text-xs text-primary/60 sm:text-sm">
            Select 100 Minutes, 300 Minutes, or Unlimited Selected Countries
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => {
          const isSelected = pkg.isCurrent;

          return (
            <div
              key={pkg.id}
              className={`relative flex flex-col justify-between rounded-xl bg-white p-6 pt-8 border-2 transition-all ${
                isSelected
                  ? "border-btnPrimary shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-btnPrimary px-4 py-1 text-xs font-bold tracking-wide text-white shadow-sm">
                  <span>★</span> MOST POPULAR
                </span>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <span className="rounded border border-gray-200 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary/55">
                    {pkg.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-primary sm:text-2xl">
                      CHF {pkg.price}
                    </span>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center gap-2">
                  <Phone size={18} className="shrink-0 text-btnPrimary" />
                  <h4 className="text-base font-bold text-primary sm:text-lg">
                    {pkg.title}
                  </h4>
                </div>

                <p className="mt-1.5 text-xs leading-normal text-primary/65 sm:text-sm">
                  {pkg.description}
                </p>

                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/70 p-3">
                  <Clock size={18} className="shrink-0 text-btnPrimary" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
                      VALIDITY
                    </p>
                    <p className="text-sm font-bold text-primary">
                      {pkg.validity}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-primary sm:text-sm">
                    Included:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.included.map((country, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-100 px-2.5 py-1 text-xs font-medium text-primary/75"
                      >
                        {country}
                      </span>
                    ))}
                    <span className="rounded bg-btnPrimary/10 px-2.5 py-1 text-xs font-bold text-btnPrimary">
                      +{pkg.moreCount} more
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {pkg.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-primary/80 sm:text-sm"
                    >
                      <span className="text-xs font-bold text-btnPrimary sm:text-sm">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <button
                  type="button"
                  disabled={isSelected}
                  className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-3 text-xs font-bold transition-colors sm:text-sm ${
                    isSelected
                      ? "cursor-not-allowed bg-gray-100 text-primary/45"
                      : "bg-[#1e293b] text-white shadow-sm hover:bg-[#0f172a]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Clock size={16} />
                      <span>Already Active</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Add Package</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntlCountrySearchCard = () => {
  const { popularCountries } = USER_PLANS_OPTIONS.intlCalls;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
          <Globe size={20} />
        </span>
        <div>
          <h3 className="text-base font-bold text-primary sm:text-lg">
            Find Call Rates & Packages for Your Country
          </h3>
          <p className="text-xs text-primary/60 sm:text-sm">
            Search any country to see which calling pack includes it
          </p>
        </div>
      </div>

      <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40"
          />
          <input
            type="text"
            placeholder="Search country e.g. Bangladesh, India..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3.5 pr-4 pl-11 text-sm text-primary placeholder:text-primary/40 focus:border-btnPrimary focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-primary/60">Popular:</span>
          {popularCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              className="rounded-full border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-semibold text-primary/80 transition-colors hover:bg-gray-100 hover:text-primary sm:text-sm"
            >
              {country.code} {country.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export const IntlFaqAccordion = () => {
  const { faqs } = USER_PLANS_OPTIONS.intlCalls;
  const [openFaqId, setOpenFaqId] = useState("faq-1");

  const toggleFaq = (id) => {
    setOpenFaqId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-50/50 bg-[#eef7ff] text-btnPrimary">
          <HelpCircle size={20} />
        </span>
        <div>
          <h3 className="text-base font-bold text-primary sm:text-lg">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-primary/60 sm:text-sm">
            Common queries regarding international calling
          </p>
        </div>
      </div>

      <section className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;

          return (
            <div key={faq.id} className="py-3.5 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-primary transition-colors hover:text-btnPrimary sm:text-base"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-primary/40">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
              {isOpen && (
                <p className="mt-2.5 pr-6 text-xs leading-relaxed text-primary/70 sm:text-sm">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

const IntlCallsTab = () => (
  <div className="space-y-6">
    <IntlHeroBanner />
    <IntlActivePackageCard />
    <IntlAvailablePackagesGrid />
    <IntlCountrySearchCard />
    <IntlFaqAccordion />
  </div>
);

export default IntlCallsTab;
