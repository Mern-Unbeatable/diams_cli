import DashboardTabs from "@/Components/dashboard/DashboardTabs";
import { USER_PLANS_OPTIONS } from "@/config/userPlansOptions";

const PlansTabs = ({ activeTab, setActiveTab }) => (
  <DashboardTabs
    tabs={USER_PLANS_OPTIONS.tabs}
    activeTab={activeTab}
    onChange={setActiveTab}
  />
);

export default PlansTabs;
