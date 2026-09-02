import {
  CollaboratorOverviewHeader,
  CollaboratorStatCards,
  CollaboratorQuickActions,
  CollaboratorRevenueOverviewCard,
  CollaboratorRecentCustomersCard,
  CollaboratorRecentActivationsCard,
} from "./sections";

const CollaboratorOverview = () => {
  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Header */}
      <CollaboratorOverviewHeader />

      {/* 2. Top 6 Metric Cards */}
      <CollaboratorStatCards />

      {/* 3. Quick Actions Bar */}
      <CollaboratorQuickActions />

      {/* 4. Revenue Overview Card */}
      <CollaboratorRevenueOverviewCard />

      {/* 5. Recent Customers Table Card */}
      <CollaboratorRecentCustomersCard />

      {/* 6. Recent Activations Table Card */}
      <CollaboratorRecentActivationsCard />
    </div>
  );
};

export default CollaboratorOverview;
