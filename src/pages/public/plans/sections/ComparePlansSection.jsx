import {
  CheckCircle2,
  FileText,
  Globe,
  MessageSquare,
  Phone,
  Signal,
  Smartphone,
  Wifi,
} from "lucide-react";
import { PLANS } from "@/config/plans";
import { PLANS_COMPARE } from "@/config/plansCompare";

const ROW_ICONS = {
  signal: Signal,
  phone: Phone,
  message: MessageSquare,
  wifi: Wifi,
  sim: Smartphone,
  globe: Globe,
  file: FileText,
};

const ComparePlansSection = () => {
  const { title, rows } = PLANS_COMPARE;
  const total = rows.length;

  return (
    <section className="bg-primary">
      <div className="mx-auto container px-5 py-14 sm:px-6 sm:py-20 lg:px-10">
        <h2 className="text-center text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div className="mt-10 overflow-x-auto rounded-xl border border-btnPrimary/25 bg-secondary">
          <div className="min-w-180">
            <div className="grid grid-cols-4 border-b bg-textAccent/10 border-white/10">
              <div className="px-6 py-5 text-sm font-semibold text-white sm:px-8 sm:py-6 sm:text-base">
                Features
              </div>

              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="px-4 py-5 text-center sm:px-6 sm:py-6"
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold uppercase text-textsecondary sm:text-lg">
                        {plan.name}
                      </span>
                      {plan.popular && (
                        <span className="rounded-full bg-btnPrimary px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <div className="flex items-end justify-center gap-0.5 text-white">
                      <span className="pb-0.5 text-xs font-medium">
                        {plan.currency}
                      </span>
                      <span className="text-xl font-bold leading-none sm:text-2xl">
                        {plan.price}
                      </span>
                      <span className="pb-0.5 text-xs">{plan.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {rows.map((row) => {
              const Icon = ROW_ICONS[row.icon];

              return (
                <div
                  key={row.id}
                  className="grid grid-cols-4 border-b border-white/10 last:border-b-0"
                >
                  <div className="flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5">
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-textsecondary"
                    />
                    <span className="text-sm font-medium text-white sm:text-base">
                      {row.label}
                    </span>
                  </div>

                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className="flex items-center justify-center px-4 py-4 sm:px-6 sm:py-5"
                    >
                      {row.type === "check" ? (
                        <CheckCircle2
                          size={22}
                          strokeWidth={2}
                          className="text-textAccent"
                        />
                      ) : (
                        <span className="text-center text-sm text-white sm:text-base">
                          {row.values[plan.id]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}

            <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-5">
              <p className="text-sm text-white">
                Showing 1 to {total} of {total} results
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled
                  className="rounded-md border border-btnPrimary px-5 py-2 text-sm font-semibold text-btnPrimary opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-md border border-btnPrimary px-5 py-2 text-sm font-semibold text-btnPrimary opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparePlansSection;
