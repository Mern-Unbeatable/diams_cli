import PlanSummaryWidget from "./PlanSummaryWidget";
import WhyUpgradeWidget from "./WhyUpgradeWidget";
import NeedHelpWidget from "./NeedHelpWidget";

const PlansSidebar = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6 items-start">
    <PlanSummaryWidget />
    <WhyUpgradeWidget />
    <NeedHelpWidget />
  </div>
);

export { PlanSummaryWidget, WhyUpgradeWidget, NeedHelpWidget };
export default PlansSidebar;
