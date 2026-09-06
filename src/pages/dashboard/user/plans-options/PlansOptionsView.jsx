import { useState } from "react";
import PlansTabs from "./sections/PlansTabs";
import ChangePlanTab from "./sections/ChangePlanTab";
import AddOptionsTab from "./sections/AddOptionsTab";
import RoamingTab from "./sections/RoamingTab";
import DataBoostersTab from "./sections/DataBoostersTab";
import IntlCallsTab from "./sections/IntlCallsTab";
import ServicesTab from "./sections/ServicesTab";
import PlansSidebar from "./sections/PlansSidebar";

const PlansOptionsView = () => {
  const [activeTab, setActiveTab] = useState("change-plan");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-primary sm:text-[1.75rem]">
          Plans & Options
        </h2>
        <p className="mt-1 text-sm text-primary/60">
          Change your plan or add options and services to customize your experience.
        </p>
      </div>

    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
      {/* Left Main Content Area */}
      <div className="space-y-6 min-w-0">
        <PlansTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "change-plan" && <ChangePlanTab />}
        {activeTab === "add-options" && <AddOptionsTab />}
        {activeTab === "roaming" && <RoamingTab />}
        {activeTab === "data-boosters" && <DataBoostersTab />}
        {activeTab === "intl-calls" && <IntlCallsTab />}
        {activeTab === "services" && <ServicesTab />}
      </div>

      {/* Right Column / Sidebar */}
      <div className="space-y-6 min-w-0">
        <PlansSidebar />
      </div>
    </div>
    </div>
  );
};

export default PlansOptionsView;
