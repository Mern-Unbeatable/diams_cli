import UsagePlanSummaryWidget from "./UsagePlanSummaryWidget";
import UsageActiveOptionsWidget from "./UsageActiveOptionsWidget";
import UsageTravelPromoCard from "./UsageTravelPromoCard";
import UsageHelpWidget from "./UsageHelpWidget";

export const UsageSidebar = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-1">
      <UsagePlanSummaryWidget />
      <UsageActiveOptionsWidget />
      <UsageTravelPromoCard />
      <UsageHelpWidget />
    </div>
  );
};

export {
  UsagePlanSummaryWidget,
  UsageActiveOptionsWidget,
  UsageTravelPromoCard,
  UsageHelpWidget,
};

export default UsageSidebar;
