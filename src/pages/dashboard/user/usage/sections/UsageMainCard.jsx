import { useState } from "react";
import { Link } from "react-router";
import { Info } from "lucide-react";
import { USER_USAGE } from "@/config/userUsage";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import UsageCallsView from "./UsageCallsView";
import UsageSmsView from "./UsageSmsView";

const USAGE_SUB_TABS = [
  { id: "data", label: "Data" },
  { id: "calls", label: "Calls" },
  { id: "sms", label: "SMS" },
];

export const UsageMainCard = () => {
  const [activeTab, setActiveTab] = useState("data");
  const { usageSummary, currentPlan } = USER_USAGE;

  // Donut chart calculation
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset =
    circumference - (usageSummary.usedPercentage / 100) * circumference;

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
        <UsageSmsView />
      ) : (
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
          {/* Metric Top Section */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Donut Chart Ring */}
            <div className="relative mx-auto flex h-36 w-36 shrink-0 items-center justify-center sm:mx-0">
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
                <span className="text-xl font-bold leading-none text-primary sm:text-2xl">
                  {usageSummary.usedData}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-wide text-primary/45">
                  GB
                </p>
                <p className="mt-0.5 text-[9px] text-primary/40">
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
                <p className="mt-0.5 text-xs text-primary/55">
                  {usageSummary.remainingData} GB remaining
                </p>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-btnPrimary transition-all duration-500"
                  style={{ width: `${usageSummary.usedPercentage}%` }}
                />
              </div>

              <div className="flex items-center gap-2.5 rounded-xl border border-blue-100/60 bg-[#eef7ff]/60 px-4 py-3 text-xs text-primary/70">
                <Info size={16} className="shrink-0 text-btnPrimary" />
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
          <div className="grid gap-4 pt-2 md:grid-cols-2">
            {/* Card 1: Usage Details */}
            <div className="space-y-3 rounded-xl border border-gray-100 bg-gray-50/40 p-4">
              <h4 className="text-xs font-bold text-primary">Usage details</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-primary/55">Used</span>
                  <span className="font-bold text-primary">
                    {usageSummary.usedData} GB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Remaining</span>
                  <span className="font-bold text-primary">
                    {usageSummary.remainingData} GB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Total</span>
                  <span className="font-bold text-primary">
                    {usageSummary.totalData} GB
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-primary/55">Included hotspot</span>
                  <span className="font-bold text-primary">
                    {usageSummary.includedHotspot} GB
                  </span>
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
            <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-100 bg-gray-50/40 p-4">
              <div className="pr-16">
                <h4 className="text-xs font-bold text-primary">Roaming usage</h4>
                <p className="mt-2 text-xs leading-relaxed text-primary/55">
                  {usageSummary.roamingUsageText}
                </p>
              </div>

              {/* Suitcase Graphic */}
              <div className="absolute right-3 bottom-3 opacity-90">
                <div className="flex h-20 w-16 flex-col items-center justify-between rounded-2xl bg-sky-400 p-1.5 shadow-sm">
                  <div className="h-3 w-8 rounded-t-lg border-2 border-white" />
                  <div className="flex h-12 w-full items-center justify-around rounded-xl bg-sky-500 px-1">
                    <div className="h-8 w-1 rounded-full bg-white/40" />
                    <div className="h-8 w-1 rounded-full bg-white/40" />
                    <div className="h-8 w-1 rounded-full bg-white/40" />
                  </div>
                  <div className="flex w-full justify-between px-1">
                    <div className="h-2 w-2 rounded-full bg-slate-800" />
                    <div className="h-2 w-2 rounded-full bg-slate-800" />
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

export default UsageMainCard;
