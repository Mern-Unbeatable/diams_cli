import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Globe,
  HelpCircle,
  Info,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  Plane,
  Voicemail,
  Wifi,
  Zap,
} from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";

export const UsageHeader = () => (
  <div>
    <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
      My usage
    </h2>
    <p className="mt-1 text-sm text-primary/60">
      Track your real-time usage.
    </p>
  </div>
);

export const UsagePlanBanner = () => {
  const { currentPlan } = USER_USAGE;

  return (
    <section className="rounded-2xl bg-[#0b1329] p-5 sm:p-6 text-white flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between shadow-lg shadow-slate-900/10">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
          CURRENT PLAN
        </p>
        <div className="mt-1 flex items-center gap-2">
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            {currentPlan.name}
          </h3>
          <span className="rounded bg-btnPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
            {currentPlan.networkBadge}
          </span>
        </div>
        <p className="mt-1 text-xs text-white/60">
          Next billing cycle: {currentPlan.renewDate}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/dashboard/user/plans-options"
          className="rounded-xl border border-white/20 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10"
        >
          Change plan
        </Link>
        <Link
          to="/dashboard/user/plans-options"
          className="rounded-xl bg-btnPrimary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
        >
          View plan details
        </Link>
      </div>
    </section>
  );
};

const USAGE_SUB_TABS = [
  { id: "data", label: "Data" },
  { id: "calls", label: "Calls" },
  { id: "sms", label: "SMS" },
];

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
            <h3 className="text-xl font-bold text-primary mt-1">
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
            <h3 className="text-xl font-bold text-primary mt-1">
              {callSummary.intlCalls}
            </h3>
            <p className="mt-2 text-xs text-primary/50">
              {callSummary.intlCallsLabel}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Card: Recent Call Activity */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Recent Call Activity
            </h3>
            <p className="mt-0.5 text-xs text-primary/50">
              Real-time log of incoming and outgoing calls
            </p>
          </div>

          <div className="flex items-center rounded-xl bg-gray-100 p-1 text-xs font-semibold self-start sm:self-auto">
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
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-primary/60 uppercase">
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

export const UsageMainCard = () => {
  const [activeTab, setActiveTab] = useState("data");
  const { usageSummary, currentPlan } = USER_USAGE;

  // Donut chart calculation
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (usageSummary.usedPercentage / 100) * circumference;

  return (
    <div className="space-y-4">
      {/* Sub Tabs */}
      <DashboardTabs
        tabs={USAGE_SUB_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "calls" ? (
        <UsageCallsView />
      ) : activeTab === "sms" ? (
        <UsageCallsView />
      ) : (
        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-6">
          {/* Metric Top Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Donut Chart Ring */}
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center mx-auto sm:mx-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="stroke-gray-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="stroke-btnPrimary transition-all duration-500"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold text-primary sm:text-2xl leading-none">
                  {usageSummary.usedData}
                </span>
                <p className="text-[10px] font-bold text-primary/45 uppercase tracking-wide">
                  GB
                </p>
                <p className="text-[9px] text-primary/40 mt-0.5">
                  of {usageSummary.totalData} GB
                </p>
              </div>
            </div>

            {/* Stats Bar & Renewal Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {usageSummary.usedPercentage}% used
                </h3>
                <p className="text-xs text-primary/55 mt-0.5">
                  {usageSummary.remainingData} GB remaining
                </p>
              </div>

              <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-btnPrimary transition-all duration-500"
                  style={{ width: `${usageSummary.usedPercentage}%` }}
                />
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-blue-100/60 bg-[#eef7ff]/60 px-4 py-3 text-xs text-primary/70">
                <Info size={16} className="text-btnPrimary shrink-0" />
                <span>
                  Your plan will renew in{" "}
                  <span className="font-semibold text-primary">
                    {currentPlan.renewDays} days
                  </span>{" "}
                  ({currentPlan.renewDate} at {currentPlan.renewTime})
                </span>
              </div>
            </div>
          </div>

          {/* 2 Sub Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 pt-2">
            {/* Card 1: Usage Details */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/40 p-4 space-y-3">
              <h4 className="text-xs font-bold text-primary">Usage details</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-primary/55">Used</span>
                  <span className="font-bold text-primary">{usageSummary.usedData} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Remaining</span>
                  <span className="font-bold text-primary">{usageSummary.remainingData} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Total</span>
                  <span className="font-bold text-primary">{usageSummary.totalData} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Included hotspot</span>
                  <span className="font-bold text-primary">{usageSummary.includedHotspot} GB</span>
                </div>
              </div>

              <div className="pt-1">
                <Link
                  to="/dashboard/user/usage"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
                >
                  View daily breakdown →
                </Link>
              </div>
            </div>

            {/* Card 2: Roaming Usage */}
            <div className="relative rounded-xl border border-gray-100 bg-gray-50/40 p-4 flex flex-col justify-between overflow-hidden">
              <div className="pr-16">
                <h4 className="text-xs font-bold text-primary">Roaming usage</h4>
                <p className="mt-2 text-xs text-primary/55 leading-relaxed">
                  {usageSummary.roamingUsageText}
                </p>
              </div>

              {/* Suitcase Graphic */}
              <div className="absolute right-3 bottom-3 opacity-90">
                <div className="w-16 h-20 bg-sky-400 rounded-2xl p-1.5 flex flex-col justify-between items-center shadow-sm">
                  <div className="w-8 h-3 border-2 border-white rounded-t-lg" />
                  <div className="w-full h-12 bg-sky-500 rounded-xl flex items-center justify-around px-1">
                    <div className="w-1 h-8 bg-white/40 rounded-full" />
                    <div className="w-1 h-8 bg-white/40 rounded-full" />
                    <div className="w-1 h-8 bg-white/40 rounded-full" />
                  </div>
                  <div className="w-full flex justify-between px-1">
                    <div className="w-2 h-2 bg-slate-800 rounded-full" />
                    <div className="w-2 h-2 bg-slate-800 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/dashboard/user/plans-options"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-btnPrimary hover:underline"
                >
                  View international rates →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export const UsageNeedMoreBanner = () => (
  <section className="flex flex-col gap-3 rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
        <Zap size={18} />
      </span>
      <div>
        <h4 className="text-xs font-bold text-primary">Need more data?</h4>
        <p className="text-[11px] text-primary/55">
          Add a data booster to stay connected.
        </p>
      </div>
    </div>

    <Link
      to="/dashboard/user/plans-options"
      className="inline-flex shrink-0 items-center justify-center rounded-xl bg-btnPrimary px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
    >
      Add a booster
    </Link>
  </section>
);

export const UsageBoostersGrid = () => {
  const { boosters } = USER_USAGE;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-primary">Data boosters</h3>
        <Link
          to="/dashboard/user/plans-options"
          className="text-xs font-semibold text-btnPrimary hover:underline"
        >
          View all boosters →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {boosters.map((booster) => (
          <div
            key={booster.id}
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4"
          >
            <div>
              <h4 className="text-sm font-bold text-primary">{booster.amount}</h4>
              <p className="text-[10px] text-primary/45 mt-0.5">{booster.validity}</p>
              <p className="mt-2 text-xs font-bold text-primary">
                CHF {booster.price}
              </p>
            </div>

            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-btnPrimary text-white shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-label={`Add ${booster.amount}`}
            >
              <Plus size={15} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const UsageSidebar = () => {
  const { sidebarSummary, activeOptions, helpLinks } = USER_USAGE;

  return (
    <div className="space-y-6">
      {/* Widget 1: Your Plan Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-primary">Your plan summary</h3>

        <div className="space-y-4">
          {sidebarSummary.map((item) => (
            <div key={item.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {item.id === "data" && <Wifi size={14} className="text-btnPrimary" />}
                  {item.id === "calls" && <Phone size={14} className="text-emerald-500" />}
                  {item.id === "sms" && <MessageSquare size={14} className="text-purple-500" />}
                  {item.id === "hotspot" && <Wifi size={14} className="text-primary/45" />}
                  <span className="font-semibold text-primary">{item.label}</span>
                </div>
                <span
                  className={`font-semibold ${
                    item.isLink ? "text-btnPrimary" : "text-primary/70"
                  }`}
                >
                  {item.value}
                </span>
              </div>

              {!item.isLink && (
                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.style}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Widget 2: Active Options */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-primary">Active options</h3>
          <Link
            to="/dashboard/user/plans-options"
            className="text-xs font-semibold text-btnPrimary hover:underline"
          >
            View all →
          </Link>
        </div>

        <ul className="space-y-3">
          {activeOptions.map((opt) => (
            <li key={opt.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5 text-primary/80">
                {opt.icon === "globe" && <Globe size={15} className="text-primary/45" />}
                {opt.icon === "phone" && <Phone size={15} className="text-primary/45" />}
                {opt.icon === "voicemail" && <Voicemail size={15} className="text-primary/45" />}
                <span className="font-semibold">{opt.name}</span>
              </div>
              <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                {opt.status}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Widget 3: Travel Promo Card */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0b1329] p-5 text-white shadow-md">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold">Travel with peace of mind</h4>
            <Plane size={18} className="text-white/80 shrink-0" />
          </div>
          <p className="text-xs text-white/60 leading-relaxed max-w-[200px]">
            Activate a roaming option and enjoy your trip abroad.
          </p>

          <Link
            to="/dashboard/user/plans-options"
            className="inline-flex items-center gap-1 rounded-xl bg-btnPrimary px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-btnPrimary/90"
          >
            Discover our options →
          </Link>
        </div>

        {/* Dotted trajectory graphic */}
        <div className="absolute right-2 bottom-2 opacity-20 pointer-events-none">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            <path
              d="M10 70 C 40 10, 80 80, 110 20"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </section>

      {/* Widget 4: Need Help */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 space-y-3">
        <h3 className="text-sm font-bold text-primary">Need help?</h3>
        <ul className="divide-y divide-gray-100">
          {helpLinks.map((item) => (
            <li key={item.id}>
              <Link
                to="/dashboard/user/support"
                className="flex items-center gap-3 py-3 transition-colors hover:opacity-80"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-primary/70 border border-gray-100">
                  {item.icon === "chat" && <MessageCircle size={16} />}
                  {item.icon === "help" && <HelpCircle size={16} />}
                  {item.icon === "phone" && <Phone size={16} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-primary">{item.title}</p>
                  <p className="text-[10px] text-primary/45 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <ChevronRight size={14} className="shrink-0 text-primary/30" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
