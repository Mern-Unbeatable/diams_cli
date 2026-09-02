import CurrentPlanCard from "./CurrentPlanCard";
import { PlanComparisonGrid } from "../components/PlanComparisonGrid";
import { QuickAddOptions } from "../components/QuickAddOptions";

const ChangePlanTab = () => (
  <div className="space-y-6">
    <CurrentPlanCard />
    <PlanComparisonGrid />
    <QuickAddOptions />
  </div>
);

export { PlanComparisonGrid, QuickAddOptions };
export default ChangePlanTab;
