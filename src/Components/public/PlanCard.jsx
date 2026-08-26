import { Link } from "react-router";
import {
  CheckCircle2,
  ChevronRight,
  Globe,
  MessageSquare,
  Phone,
  Signal,
  Wifi,
} from "lucide-react";

const FEATURE_ICONS = {
  signal: Signal,
  phone: Phone,
  message: MessageSquare,
  wifi: Wifi,
  globe: Globe,
  check: CheckCircle2,
};

const PlanCard = ({ plan }) => {
  const { name, tagline, price, currency, period, features, cta, detailsPath, popular } =
    plan;

  return (
    <article
      className={`relative flex flex-col rounded-xl bg-secondary p-6 lg:p-8 ${
        popular ? "border border-btnPrimary" : ""
      }`}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-btnPrimary px-4 py-1 text-xs font-bold tracking-wide text-white">
          POPULAR
        </span>
      )}

      <header>
        <h3 className="text-2xl font-bold text-white lg:text-3xl">
          NovaSky <span className="text-textAccent">{name}</span>
        </h3>
        <p className="mt-2 text-sm text-white lg:text-base">{tagline}</p>
      </header>

      <div className="mt-6 flex items-end gap-1">
        <span className="pb-1 text-sm font-medium text-white">{currency}</span>
        <span className="text-4xl font-bold leading-none text-white lg:text-5xl">
          {price}
        </span>
        <span className="pb-1 text-sm text-white">{period}</span>
      </div>

      <ul className="mt-8 flex flex-1 flex-col gap-4">
        {features.map(({ icon, text }) => {
          const Icon = FEATURE_ICONS[icon];
          return (
            <li key={text} className="flex items-start gap-3">
              <Icon
                size={18}
                strokeWidth={2}
                className="mt-0.5 shrink-0 text-textAccent"
              />
              <span className="text-sm leading-snug text-white lg:text-base">
                {text}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <Link
          to={cta.path}
          className="flex w-full items-center justify-center rounded-md bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
        >
          {cta.label}
        </Link>

        <Link
          to={detailsPath}
          className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-white transition-colors duration-200 hover:text-textAccent"
        >
          More details
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default PlanCard;
