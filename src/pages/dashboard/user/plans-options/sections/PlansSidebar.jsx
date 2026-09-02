import PlanSummaryWidget from "./PlanSummaryWidget";
import WhyUpgradeWidget from "./WhyUpgradeWidget";
import NeedHelpWidget from "./NeedHelpWidget";

const PlansSidebar = () => (
  <div className="space-y-6">
    <PlanSummaryWidget />
    <WhyUpgradeWidget />
    <NeedHelpWidget />
  </div>
);

export { PlanSummaryWidget, WhyUpgradeWidget, NeedHelpWidget };
export default PlansSidebar;
