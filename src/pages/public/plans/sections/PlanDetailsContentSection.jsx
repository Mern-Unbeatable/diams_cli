import { Link } from "react-router";
import {
  Ban,
  CheckCircle2,
  CloudDownload,
  FileText,
  Globe,
  MessageSquare,
  Phone,
  ShieldCheck,
  Signal,
  Smartphone,
  Wifi,
} from "lucide-react";

const INCLUDED_ICONS = {
  signal: Signal,
  cloud: CloudDownload,
  phone: Phone,
  message: MessageSquare,
  globe: Globe,
  wifi: Wifi,
  ban: Ban,
  sim: Smartphone,
  shield: ShieldCheck,
};

const SUMMARY_ICONS = {
  signal: Signal,
  phone: Phone,
  message: MessageSquare,
  globe: Globe,
  wifi: Wifi,
  sim: Smartphone,
  file: FileText,
};

const PlanDetailsContentSection = ({ plan }) => {
  return (
    <section className="relative z-10 bg-primary pb-14 sm:pb-20">
      <div className="mx-auto container px-5 sm:px-6 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[1.65fr_1fr] lg:gap-6">
          <article className="rounded-2xl border border-white/10 bg-secondary p-6 sm:p-8 lg:p-10">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              What&apos;s included
            </h2>

            <div className="mt-8 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              {plan.included.map(({ id, icon, title, description }) => {
                const Icon = INCLUDED_ICONS[icon];

                return (
                  <div key={id} className="flex gap-3.5">
                    <Icon
                      size={22}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-textAccent"
                    />
                    <div>
                      <h3 className="text-sm font-semibold text-white sm:text-base">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-textsecondary">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="flex flex-col rounded-2xl border border-white/10 bg-secondary p-6 sm:p-8 lg:p-10">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Plan summary
            </h2>

            <ul className="mt-6 flex-1 divide-y divide-white/10">
              {plan.summary.map(({ id, icon, label, value, type }) => {
                const Icon = SUMMARY_ICONS[icon];

                return (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-textAccent"
                      />
                      <span className="text-sm text-white">{label}</span>
                    </div>

                    {type === "check" ? (
                      <CheckCircle2
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 text-textAccent"
                      />
                    ) : (
                      <span className="shrink-0 text-right text-sm font-medium text-white">
                        {value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex shrink-0 items-end gap-1">
                <span className="pb-0.5 text-sm font-medium text-white">
                  {plan.currency}
                </span>
                <span className="text-3xl font-bold leading-none text-white">
                  {plan.price}
                </span>
                <span className="pb-0.5 text-sm text-white">{plan.period}</span>
              </div>

              <Link
                to={plan.cta.path}
                className="inline-flex w-full items-center justify-center rounded-lg bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 sm:w-auto sm:min-w-[200px]"
              >
                {plan.chooseLabel}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default PlanDetailsContentSection;
