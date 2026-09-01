import { USER_OVERVIEW } from "@/config/userOverview";
import { OverviewPremiumCard } from "./OverviewPremiumCard";
import { OverviewQuickActionsCard } from "./OverviewQuickActionsCard";
import { OverviewPromoCard } from "./OverviewPromoCard";
import { OverviewHelpCard } from "./OverviewHelpCard";

const OverviewSidebar = () => {
  const { premium, quickActions, promo, help } = USER_OVERVIEW;

  return (
    <aside className="space-y-4">
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
