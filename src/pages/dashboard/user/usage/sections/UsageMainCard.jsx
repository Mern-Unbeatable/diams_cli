import { useState } from "react";
import { USER_USAGE } from "@/config/userUsage";
import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import UsageCallsView from "./UsageCallsView";
import UsageSmsView from "./UsageSmsView";
import DataUsageSection from "./data/DataUsageSection";

const USAGE_SUB_TABS = [
  { id: "data", label: "Data" },
  { id: "calls", label: "Calls" },
  { id: "sms", label: "SMS" },
];

export const UsageMainCard = () => {
  const [activeTab, setActiveTab] = useState("data");
  const { usageSummary, currentPlan } = USER_USAGE;



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
        <DataUsageSection
          usageSummary={usageSummary}
          currentPlan={currentPlan}
        />
      )}
    </div>
  );
};

export default UsageMainCard;
