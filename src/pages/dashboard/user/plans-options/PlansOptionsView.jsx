import { useState } from "react";
import {
  CurrentPlanCard,
  NeedHelpWidget,
  PlanComparisonGrid,
  PlanSummaryWidget,
  PlansTabs,
  QuickAddOptions,
  WhyUpgradeWidget,
} from "./sections/PlansOptionsSections";

const PlansOptionsView = () => {
  const [activeTab, setActiveTab] = useState("change-plan");

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <PlansTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === "change-plan" && (
            <>
              <CurrentPlanCard />
              <PlanComparisonGrid />
              <QuickAddOptions />
            </>
          )}

          {activeTab !== "change-plan" && (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-primary/50">
              This section is coming soon. Please use the Change Plan tab for now.
            </div>
          )}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <PlanSummaryWidget />
          <WhyUpgradeWidget />
          <NeedHelpWidget />
        </div>
      </div>
    </div>
  );
};

export default PlansOptionsView;
