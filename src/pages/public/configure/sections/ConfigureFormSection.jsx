import { Link } from "react-router";
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  Info,
  Phone,
  PhoneForwarded,
  Plus,
  Shield,
  ThumbsUp,
} from "lucide-react";
import {
  ACTIVATION_OPTIONS,
  CONFIGURE_PAGE,
  NUMBER_OPTIONS,
  TRUST_BADGES,
} from "@/config/configure";
import SimTypeSelector from "@/Components/public/SimTypeSelector";
import NumberOptionCard from "@/Components/public/NumberOptionCard";

const PhoneNewIcon = (props) => (
  <span className="relative inline-flex">
    <Phone {...props} />
    <Plus
      size={12}
      strokeWidth={2.5}
      className="absolute -right-1 -top-1 text-textsecondary"
    />
  </span>
);

const NUMBER_ICONS = {
  "phone-new": PhoneNewIcon,
  "phone-port": PhoneForwarded,
};

const TRUST_ICONS = {
  shield: Shield,
  "thumbs-up": ThumbsUp,
};

const ConfigureFormSection = ({
  planId,
  simType,
  numberOption,
  activationDate,
  onSimChange,
  onNumberChange,
  onActivationChange,
}) => {
  return (
    <div className="min-w-0">
      <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-[28px]">
        {CONFIGURE_PAGE.title}{" "}
        <span className="text-textAccent">{CONFIGURE_PAGE.titleAccent}</span>
      </h1>
      <p className="mt-2 text-sm text-white/70 sm:text-base">
        {CONFIGURE_PAGE.subtitle}
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-bold text-white">
          1. Choose your SIM type.
        </h2>
        <div className="mt-4">
          <SimTypeSelector value={simType} onChange={onSimChange} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold text-white">
          2. Get a new number or keep your current number?
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {NUMBER_OPTIONS.map((option) => (
            <NumberOptionCard
              key={option.id}
              selected={numberOption === option.id}
              onSelect={() => onNumberChange(option.id)}
              icon={NUMBER_ICONS[option.icon]}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-bold text-white">
          3. Choose your activation date
        </h2>
        <div className="relative mt-4">
          <Calendar
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-textsecondary"
          />
          <select
            value={activationDate}
            onChange={(e) => onActivationChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/15 bg-secondary py-3.5 pl-11 pr-10 text-sm text-white outline-none transition-colors focus:border-btnPrimary"
          >
            {ACTIVATION_OPTIONS.map((option) => (
              <option key={option.id} value={option.id} className="bg-secondary">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-textsecondary"
          />
        </div>
        <p className="mt-3 flex items-start gap-2 text-sm text-textsecondary">
          <Info size={16} className="mt-0.5 shrink-0" />
          {CONFIGURE_PAGE.activationNote}
        </p>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {TRUST_BADGES.map(({ id, icon, title, description }) => {
          const Icon = TRUST_ICONS[icon];
          return (
            <article
              key={id}
              className="rounded-xl border border-white/10 bg-secondary/60 p-5"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-btnPrimary/20">
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className="text-textsecondary"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-snug text-white/65">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-btnPrimary px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:max-w-[320px] sm:text-base"
        >
          Continue
          <ArrowRight size={18} />
        </button>

        <div className="mt-4">
          <Link
            to={`/plans/${planId}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-textsecondary transition-colors hover:text-textAccent"
          >
            <ChevronLeft size={16} />
            Back to plan details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfigureFormSection;
