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
  check: CheckCircle2,
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
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr] lg:items-stretch lg:gap-8">
          <article className="flex h-full flex-col rounded-xl border border-btnPrimary/20 bg-secondary p-8 lg:p-10">
            <h2 className="text-xl font-bold text-white lg:text-2xl">
              What&apos;s included
            </h2>

            <div className="mt-8 grid h-full flex-1 auto-rows-fr grid-cols-1 gap-x-12 sm:grid-cols-2 sm:grid-rows-3">
              {plan.included.map(({ id, icon, title, description }) => {
                const Icon = INCLUDED_ICONS[icon];

                return (
                  <div
                    key={id}
                    className="flex h-full w-full items-start gap-4 py-5 sm:py-6 lg:py-7"
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.75}
                      className="mt-0.5 shrink-0 text-textsecondary"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold leading-snug text-white lg:text-lg">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-none text-sm leading-relaxed text-white/75 lg:text-[15px]">
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="flex h-full flex-col rounded-xl border border-btnPrimary/20 bg-secondary p-8 lg:p-10">
            <h2 className="text-xl font-bold text-white lg:text-2xl">
              Plan summary
            </h2>

            <ul className="mt-7 flex-1">
              {plan.summary.map(({ id, icon, label, value, type }, index) => {
                const Icon = SUMMARY_ICONS[icon];

                return (
                  <li
                    key={id}
                    className={`flex items-center justify-between gap-4 py-3.5 ${
                      index !== plan.summary.length - 1
                        ? "border-b border-white/10"
                        : ""
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Icon
                        size={18}
                        strokeWidth={1.75}
                        className="shrink-0 text-textsecondary"
                      />
                      <span className="text-sm text-textsecondary lg:text-[15px]">
                        {label}
                      </span>
                    </div>

                    {type === "check" ? (
                      <CheckCircle2
                        size={20}
                        strokeWidth={1.75}
                        className="shrink-0 text-textsecondary"
                      />
                    ) : (
                      <span className="shrink-0 text-right text-sm font-medium text-white lg:text-[15px]">
                        {value}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-white/10 pt-6">
              <div className="flex items-end gap-1">
                <span className="pb-0.5 text-sm font-medium text-white">
                  {plan.currency}
                </span>
                <span className="text-[34px] font-bold leading-none text-white">
                  {plan.price}
                </span>
                <span className="pb-0.5 text-sm text-white">{plan.period}</span>
              </div>

              <Link
                to={`/plans/${plan.id}/configure`}
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-btnPrimary px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90 lg:text-base"
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
