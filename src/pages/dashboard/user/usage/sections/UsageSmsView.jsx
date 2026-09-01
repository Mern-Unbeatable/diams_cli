import { useState } from "react";
import { CheckCircle2, Globe, MessageCircle, MessageSquare } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageSmsView = () => {
  const { smsSummary, recentSms } = USER_USAGE;
  const [filter, setFilter] = useState("all");

  const filteredSms = recentSms.filter((item) => {
    if (filter === "sent") return item.type === "sent";
    if (filter === "received") return item.type === "received";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top 3 Summary Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: MESSAGING PLAN */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              MESSAGING PLAN
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50/70 text-btnPrimary">
              <MessageSquare size={16} />
            </span>
          </div>
          <div>
            <h3 className="mt-1 text-xl font-bold text-primary">
              {smsSummary.messagingPlan}
            </h3>
          </div>
        </div>

        {/* Card 2: COVERAGE REGION */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              COVERAGE REGION
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50/70 text-btnPrimary">
              <Globe size={16} />
            </span>
          </div>
          <div>
            <h3 className="mt-1 text-xl font-bold text-primary">
              {smsSummary.coverageRegion}
            </h3>
          </div>
        </div>

        {/* Card 3: SERVICE STATUS */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              SERVICE STATUS
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50/70 text-emerald-600">
              <CheckCircle2 size={16} />
            </span>
          </div>
          <div>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-xl font-bold text-emerald-600">
                {smsSummary.serviceStatus}
              </h3>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {smsSummary.signalBadge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Recent SMS Activity */}
      <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Recent SMS Activity
            </h3>
            <p className="mt-0.5 text-xs text-primary/50">
              Log of sent and received text notifications
            </p>
          </div>

          <div className="flex items-center self-start rounded-xl bg-gray-100 p-1 text-xs font-semibold sm:self-auto">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3.5 py-1 transition-all ${
                filter === "all"
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("sent")}
              className={`rounded-lg px-3.5 py-1 transition-all ${
                filter === "sent"
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              Sent
            </button>
            <button
              type="button"
              onClick={() => setFilter("received")}
              className={`rounded-lg px-3.5 py-1 transition-all ${
                filter === "received"
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              Received
            </button>
          </div>
        </div>

        {/* SMS Log List */}
        <div className="divide-y divide-gray-100">
          {filteredSms.map((sms) => {
            const isSent = sms.type === "sent";

            return (
              <div
                key={sms.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-btnPrimary">
                    {isSent ? <MessageSquare size={16} /> : <MessageCircle size={16} />}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-primary">
                        {sms.name}
                      </h4>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary/60">
                        {sms.countryCode}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-primary/50">
                      {sms.number} • {isSent ? `Sent (${sms.chars})` : `Received (${sms.chars})`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-600">
                    {sms.status}
                  </span>
                  <p className="mt-1 text-xs text-primary/45">
                    {sms.timestamp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default UsageSmsView;
