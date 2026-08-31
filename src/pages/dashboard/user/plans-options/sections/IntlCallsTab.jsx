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
    <section className="rounded-2xl bg-[#0f172a] p-6 text-white space-y-4 shadow-lg shadow-slate-900/10">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/90">
        <Globe size={13} className="shrink-0 text-sky-400" />
        <span>{banner.tag}</span>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white sm:text-3xl">
          {banner.title}
        </h3>
        <p className="mt-1 text-xs text-white/60 max-w-xl leading-relaxed">
          {banner.description}
        </p>
      </div>

      <div className="border-t border-white/10 pt-4 flex flex-wrap gap-6 text-xs text-white/80 font-medium">
        {banner.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Check size={11} strokeWidth={3} />
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
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
            <Package size={17} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-primary">Your Active Packages</h3>
              <span className="rounded-full bg-btnPrimary/10 px-2.5 py-0.5 text-[10px] font-bold text-btnPrimary">
                1 ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-primary/50">
              Your currently active international calling add-ons
            </p>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-btnPrimary" />
            <h4 className="text-sm font-bold text-primary">
              {activePackage.title}
            </h4>
          </div>
          <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-bold text-btnPrimary">
            CHF {activePackage.price}
          </span>
        </div>

        <p className="text-xs text-primary/50">
          Expires on: {activePackage.expiresOn}
        </p>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary/60 font-medium">Remaining Talk Time:</span>
            <span className="font-bold text-btnPrimary">{activePackage.usedText}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full bg-btnPrimary w-[75%]" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs border-t border-gray-100">
          <span className="flex items-center gap-1.5 font-semibold text-primary/70">
            <RefreshCw size={13} className="text-emerald-600" />
            Auto-renew: <span className="font-bold text-emerald-600">ON</span>
          </span>
          <button
            type="button"
            className="flex items-center gap-1 font-semibold text-red-600 hover:underline"
          >
            <Trash2 size={13} />
            Remove
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
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
          <Phone size={17} />
        </span>
        <div>
          <h3 className="text-sm font-bold text-primary">Available Packages</h3>
          <p className="text-[11px] text-primary/50">
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
              className={`relative rounded-2xl bg-white p-5 pt-7 flex flex-col justify-between border-2 transition-all ${
                isSelected
                  ? "border-btnPrimary shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-4 py-1 text-[10px] font-bold text-white tracking-wide shadow-sm flex items-center gap-1">
                  <span>★</span> MOST POPULAR
                </span>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <span className="rounded border border-gray-200 px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary/45 uppercase">
                    {pkg.tag}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">CHF {pkg.price}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Phone size={16} className="text-btnPrimary shrink-0" />
                  <h4 className="font-bold text-primary text-sm">{pkg.title}</h4>
                </div>

                <p className="mt-1 text-[11px] text-primary/55 leading-normal">
                  {pkg.description}
                </p>

                <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/60 p-2.5 flex items-center gap-2">
                  <Clock size={15} className="text-btnPrimary shrink-0" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-primary/40">
                      VALIDITY
                    </p>
                    <p className="text-xs font-bold text-primary">{pkg.validity}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <p className="text-xs font-bold text-primary">Included:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.included.map((country, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-primary/70"
                      >
                        {country}
                      </span>
                    ))}
                    <span className="rounded bg-btnPrimary/10 px-2 py-0.5 text-[10px] font-bold text-btnPrimary">
                      +{pkg.moreCount} more
                    </span>
                  </div>
                </div>

                <ul className="mt-5 space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-primary/75">
                      <span className="text-btnPrimary font-bold text-xs">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  disabled={isSelected}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    isSelected
                      ? "bg-gray-100 text-primary/45 cursor-not-allowed flex items-center justify-center gap-1.5"
                      : "bg-[#1e293b] text-white hover:bg-[#0f172a] shadow-sm flex items-center justify-center gap-1"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Clock size={14} />
                      Already Active
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Add Package
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
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
          <Globe size={17} />
        </span>
        <div>
          <h3 className="text-sm font-bold text-primary">
            Find Call Rates & Packages for Your Country
          </h3>
          <p className="text-[11px] text-primary/50">
            Search any country to see which calling pack includes it
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 space-y-4">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary/40" />
          <input
            type="text"
            placeholder="Search country e.g. Bangladesh, India..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-10 pr-4 py-3 text-xs text-primary placeholder:text-primary/40 focus:border-btnPrimary focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-primary/50">Popular:</span>
          {popularCountries.map((country) => (
            <button
              key={country.code}
              type="button"
              className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold text-primary/75 transition-colors hover:bg-gray-100 hover:text-primary"
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
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef7ff] text-btnPrimary border border-blue-50/50">
          <HelpCircle size={17} />
        </span>
        <div>
          <h3 className="text-sm font-bold text-primary">Frequently Asked Questions</h3>
          <p className="text-[11px] text-primary/50">
            Common queries regarding international calling
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 divide-y divide-gray-100">
        {faqs.map((faq) => {
          const isOpen = openFaqId === faq.id;

          return (
            <div key={faq.id} className="py-3 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="flex w-full items-center justify-between gap-4 text-left text-xs font-bold text-primary transition-colors hover:text-btnPrimary"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 text-primary/40">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>
              {isOpen && (
                <p className="mt-2.5 text-xs text-primary/60 leading-relaxed pr-6">
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
