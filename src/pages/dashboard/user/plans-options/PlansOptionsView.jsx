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
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <PlansTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "change-plan" && <ChangePlanTab />}
          {activeTab === "add-options" && <AddOptionsTab />}
          {activeTab === "roaming" && <RoamingTab />}
          {activeTab === "data-boosters" && <DataBoostersTab />}
          {activeTab === "intl-calls" && <IntlCallsTab />}
          {activeTab === "services" && <ServicesTab />}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <PlansSidebar />
        </div>
      </div>
    </div>
  );
};

export default PlansOptionsView;
