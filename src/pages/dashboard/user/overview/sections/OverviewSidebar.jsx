import { USER_OVERVIEW } from "@/config/userOverview";
import { OverviewPremiumCard } from "./OverviewPremiumCard";
import { OverviewQuickActionsCard } from "./OverviewQuickActionsCard";
import { OverviewPromoCard } from "./OverviewPromoCard";
import { OverviewHelpCard } from "./OverviewHelpCard";

const OverviewSidebar = () => {
  const { premium, quickActions, promo, help } = USER_OVERVIEW;

  return (
    <aside className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 items-start">
      {/* Premium Status Section */}
      <OverviewPremiumCard premium={premium} />

      {/* Quick Actions Section */}
      <OverviewQuickActionsCard quickActions={quickActions} />

      {/* Promo / Assistance Banner Section */}
      <OverviewPromoCard promo={promo} />

      {/* Need Help Section */}
      <OverviewHelpCard help={help} />
    </aside>
  );
};

export default OverviewSidebar;
