import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Globe,
  Phone,
  Zap,
} from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";

export const UsageCallsView = () => {
  const { callSummary, recentCalls } = USER_USAGE;
  const [filter, setFilter] = useState("all");

  const filteredCalls = recentCalls.filter((call) => {
    if (filter === "outgoing") return call.type === "outgoing";
    if (filter === "incoming") return call.type === "incoming";
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top 3 Summary Cards Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Card 1: SUBSCRIPTION PLAN */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              SUBSCRIPTION PLAN
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50/70 text-btnPrimary">
              <Zap size={16} />
            </span>
          </div>
          <div>
            <h3 className="mt-1 text-xl font-bold text-primary">
              {callSummary.planName}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-primary/60">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span>{callSummary.networkBadge}</span>
            </p>
          </div>
        </div>

        {/* Card 2: VOICE USAGE */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              VOICE USAGE
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50/70 text-btnPrimary">
              <Phone size={16} />
            </span>
          </div>
          <div>
            <div className="mt-1 flex items-center gap-2">
              <h3 className="text-xl font-bold text-primary">
                {callSummary.voiceUsage}
              </h3>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {callSummary.extraCost}
              </span>
            </div>
            <p className="mt-2 text-xs text-primary/50">
              {callSummary.voiceUsageLabel}
            </p>
          </div>
        </div>

        {/* Card 3: INTERNATIONAL CALLS */}
        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-primary/45">
              INTERNATIONAL CALLS
            </p>
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50/70 text-btnPrimary">
              <Globe size={16} />
            </span>
          </div>
          <div>
            <h3 className="mt-1 text-xl font-bold text-primary">
              {callSummary.intlCalls}
            </h3>
            <p className="mt-2 text-xs text-primary/50">
              {callSummary.intlCallsLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Card: Recent Call Activity */}
      <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Recent Call Activity
            </h3>
            <p className="mt-0.5 text-xs text-primary/50">
              Real-time log of incoming and outgoing calls
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
              onClick={() => setFilter("outgoing")}
              className={`rounded-lg px-3.5 py-1 transition-all ${
                filter === "outgoing"
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              Outgoing
            </button>
            <button
              type="button"
              onClick={() => setFilter("incoming")}
              className={`rounded-lg px-3.5 py-1 transition-all ${
                filter === "incoming"
                  ? "bg-btnPrimary text-white shadow-sm"
                  : "text-primary/60 hover:text-primary"
              }`}
            >
              Incoming
            </button>
          </div>
        </div>

        {/* Call Log List */}
        <div className="divide-y divide-gray-100">
          {filteredCalls.map((call) => {
            const isOutgoing = call.type === "outgoing";

            return (
              <div
                key={call.id}
                className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      isOutgoing
                        ? "bg-blue-50 text-btnPrimary"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {isOutgoing ? (
                      <ArrowUpRight size={17} strokeWidth={2.5} />
                    ) : (
                      <ArrowDownLeft size={17} strokeWidth={2.5} />
                    )}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-primary">
                        {call.name}
                      </h4>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary/60">
                        {call.countryCode}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-primary/50">
                      {call.number} • {call.location}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-primary">
                    {call.duration}
                  </p>
                  <p className="mt-0.5 text-xs text-primary/45">
                    {call.timestamp}
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

export default UsageCallsView;
