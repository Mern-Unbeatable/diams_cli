import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  FileText,
  Globe,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import {
  BUSINESS_CONTACT_FORM,
  BUSINESS_FEATURES_SECTION,
} from "@/config/business";

const FEATURE_ICONS = {
  file: FileText,
  shield: ShieldCheck,
  users: Users,
  chart: BarChart3,
  globe: Globe,
  cpu: Cpu,
};

const TRUST_ICONS = {
  check: Check,
  clock: Clock,
  lock: Lock,
};

const labelClass = "mb-1.5 block text-sm font-bold text-primary";
const inputClass =
  "w-full rounded-lg border border-gray-200 bg-white py-3 text-sm text-primary outline-none transition-colors placeholder:text-gray-400 focus:border-btnPrimary";
const inputWithIconClass = `${inputClass} pl-10 pr-4`;

const BusinessContactForm = () => {
  const { label, title, submitLabel, lineOptions, trustBadges } =
    BUSINESS_CONTACT_FORM;

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-lg sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-btnPrimary sm:text-sm">
        {label}
      </p>
      <h3 className="mt-3 text-xl font-bold leading-snug text-primary sm:text-2xl">
        {title}
      </h3>

      <form
        className="mt-6 space-y-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <div className="relative">
              <User
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className={inputWithIconClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="companyName" className={labelClass}>
              Company Name
            </label>
            <div className="relative">
              <Building2
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="companyName"
                type="text"
                placeholder="Company Name"
                className={inputWithIconClass}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="businessEmail" className={labelClass}>
              Business Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="businessEmail"
                type="email"
                placeholder="Business Email"
                className={inputWithIconClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className={labelClass}>
              Phone Number
            </label>
            <div className="relative">
              <Phone
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className={inputWithIconClass}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="lineCount" className={labelClass}>
            Number of Lines
          </label>
          <div className="relative">
            <select
              id="lineCount"
              defaultValue=""
              className={`${inputClass} appearance-none px-4 pr-10`}
            >
              {lineOptions.map(({ value, label: optionLabel }) => (
                <option key={value || "default"} value={value}>
                  {optionLabel}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="businessNeeds" className={labelClass}>
            Tell us about your business needs
          </label>
          <textarea
            id="businessNeeds"
            rows={4}
            placeholder="Type your message here..."
            className={`${inputClass} resize-none px-4`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-btnPrimary py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {submitLabel}
        </button>
      </form>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {trustBadges.map(({ id, icon, title: badgeTitle, description }) => {
          const Icon = TRUST_ICONS[icon];

          return (
            <li key={id} className="flex items-start gap-2.5">
              <Icon
                size={16}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-textsecondary"
              />
              <div>
                <p className="text-xs font-bold text-primary">{badgeTitle}</p>
                <p className="text-xs leading-snug text-primary/60">
                  {description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

const BusinessFeaturesSection = () => {
  const { label, title, link, features } = BUSINESS_FEATURES_SECTION;

  return (
    <section className="page-section">
      <div className="mx-auto container px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-btnPrimary sm:text-sm">
              {label}
            </p>
            <h2 className="mt-3 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            <ul className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-7">
              {features.map(
                ({ id, icon, title: featureTitle, description }) => {
                  const Icon = FEATURE_ICONS[icon];

                  return (
                    <li key={id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-btnPrimary/10">
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          className="text-textsecondary"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-primary">{featureTitle}</p>
                        <p className="mt-1 text-sm leading-relaxed text-primary/65">
                          {description}
                        </p>
                      </div>
                    </li>
                  );
                },
              )}
            </ul>

            <Link
              to={link.path}
              className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-btnPrimary transition-opacity hover:opacity-80"
            >
              {link.label}
              <ArrowRight size={16} />
            </Link>
          </div>

          <BusinessContactForm />
        </div>
      </div>
    </section>
  );
};

export default BusinessFeaturesSection;
