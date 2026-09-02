import {
  AdminOverviewHeader,
  AdminStatCards,
  AdminRevenueOverviewCard,
  AdminPopularPlansCard,
  AdminRecentActivityCard,
  AdminCustomerGrowthCard,
  AdminActivationsCard,
} from "./sections";

const AdminOverview = () => {
  return (
    <div className="min-h-full space-y-6 text-slate-900">
      {/* 1. Page Header */}
      <AdminOverviewHeader />

      {/* 2. Top Metric Cards (8 Cards - 4 columns on large screens) */}
      <AdminStatCards />

      {/* 3. Middle Section: Revenue Overview (8 cols) & Most Popular Plans (4 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <AdminRevenueOverviewCard />
        </div>
        <div className="lg:col-span-4">
          <AdminPopularPlansCard />
        </div>
      </div>

      {/* 4. Lower Section: Recent Activity (4 cols) & Customer Growth (8 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <AdminRecentActivityCard />
        </div>
        <div className="lg:col-span-8">
          <AdminCustomerGrowthCard />
        </div>
      </div>

      {/* 5. Bottom Section: Activations per Month (Full Width) */}
      <div>
        <AdminActivationsCard />
      </div>
    </div>
  );
};

export default AdminOverview;
